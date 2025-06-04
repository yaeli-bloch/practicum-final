using Amazon.Extensions.NETCore.Setup;
using Amazon;
using Amazon.S3;
using Microsoft.EntityFrameworkCore;
using Server.Core.Repositories;
using Server.Core.Services;
using Amazon.Runtime;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Configuration;
using Server.Data;
using Server.Data.Repositories;
using Server.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);
IConfiguration configuration = builder.Configuration;
// ����� CORS (Cross-Origin Resource Sharing)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOriginsWithCredentials", policy =>
    {
        policy.SetIsOriginAllowed((host) => true)  // ����� ��� ���� ���� (�� ���������)
              .AllowAnyMethod()  // ����� �� ���� (GET, POST, PUT ���')
              .AllowAnyHeader()  // ����� �� �����
              .AllowCredentials();  // ����� ����� �� credentials (cookies/headers)
    });
});

// ����� �-DbContext �� ���� �-Connection String ����� �-appsettings.json
//builder.Services.AddDbContext<DataContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
//);
var connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"];
builder.Services.AddDbContext<DataContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString), options => options.CommandTimeout(60)));

var awsSettings = configuration.GetSection("AwsSettings");

var accessKeyId = awsSettings["AccessKeyId"];
var secretAccessKey = awsSettings["SecretAccessKey"];
// ����� ������� ��������� �� AWS (�� ��� ����� �-S3)
builder.Services.AddDefaultAWSOptions(new AWSOptions
{

    Region = RegionEndpoint.USEast1, // ��� ���� �� ����� ������ �� (��� USEast1)
    Credentials = new BasicAWSCredentials(accessKeyId, secretAccessKey) // ���� �� ������� ��� ���
});
builder.Services.AddAWSService<IAmazonS3>();

// ����� �-Repositories ��������� ���
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IFileRepository, FileRepository>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<IGroupRepository, GroupRepository>();
builder.Services.AddScoped<IGroupService, GroupService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IMessageRepository, MessageRepository>();
builder.Services.AddScoped<IMessageService, MessageService>();


// ����� JWT Authentication (����� ������� JWT)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwtSettings = builder.Configuration.GetSection("JwtSettings");
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = jwtSettings["Issuer"],  // �� �-Issuer ���� �-appsettings.json
            ValidateAudience = true,
            ValidAudience = jwtSettings["Audience"],  // �� �-Audience ���� �-appsettings.json
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"])),  // �-SecretKey ���� �-appsettings.json
            ClockSkew = TimeSpan.Zero  // ���� ����� ���� ������
        };
    });

// ����� ����� �-Controllers
builder.Services.AddControllers();

// ����� Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    // ����� ����� �-Authorization �-Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ��� ������ ��iddleware
app.UseCors("AllowAllOriginsWithCredentials");
app.UseHttpsRedirection();
app.UseAuthentication();  // �-Middleware �� ������
app.UseAuthorization();   // �-Middleware �� �������
app.MapControllers();  // ����� �-controllers
app.MapGet("/", () => "AuthServer API is running!");
app.Run();
