using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialDatabaseCreationWithData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase().Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder
                .CreateTable(
                    name: "enum.ApplicationStatus",
                    columns: table => new
                    {
                        Id = table
                            .Column<int>(type: "int", nullable: false)
                            .Annotation(
                                "MySql:ValueGenerationStrategy",
                                MySqlValueGenerationStrategy.IdentityColumn
                            ),
                        Value = table
                            .Column<string>(type: "varchar(255)", nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        Name = table
                            .Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_enum.ApplicationStatus", x => x.Id);
                    }
                )
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder
                .CreateTable(
                    name: "enum.CompanyEmployeeCount",
                    columns: table => new
                    {
                        Id = table
                            .Column<int>(type: "int", nullable: false)
                            .Annotation(
                                "MySql:ValueGenerationStrategy",
                                MySqlValueGenerationStrategy.IdentityColumn
                            ),
                        Value = table
                            .Column<string>(type: "varchar(255)", nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        Name = table
                            .Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_enum.CompanyEmployeeCount", x => x.Id);
                    }
                )
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder
                .CreateTable(
                    name: "enum.UserType",
                    columns: table => new
                    {
                        Id = table
                            .Column<int>(type: "int", nullable: false)
                            .Annotation(
                                "MySql:ValueGenerationStrategy",
                                MySqlValueGenerationStrategy.IdentityColumn
                            ),
                        Value = table
                            .Column<string>(type: "varchar(255)", nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        Name = table
                            .Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_enum.UserType", x => x.Id);
                    }
                )
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder
                .CreateTable(
                    name: "company.Company",
                    columns: table => new
                    {
                        Id = table
                            .Column<int>(type: "int", nullable: false)
                            .Annotation(
                                "MySql:ValueGenerationStrategy",
                                MySqlValueGenerationStrategy.IdentityColumn
                            ),
                        CompanyName = table
                            .Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        Location = table
                            .Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        Domain = table
                            .Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        EmployeeCount = table
                            .Column<string>(type: "longtext", nullable: true)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        EmployeesId = table.Column<int>(type: "int", nullable: false),
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_company.Company", x => x.Id);
                        table.ForeignKey(
                            name: "FK_company.Company_enum.CompanyEmployeeCount_EmployeesId",
                            column: x => x.EmployeesId,
                            principalTable: "enum.CompanyEmployeeCount",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Cascade
                        );
                    }
                )
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder
                .CreateTable(
                    name: "user.User",
                    columns: table => new
                    {
                        Id = table
                            .Column<int>(type: "int", nullable: false)
                            .Annotation(
                                "MySql:ValueGenerationStrategy",
                                MySqlValueGenerationStrategy.IdentityColumn
                            ),
                        FirstName = table
                            .Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        LastName = table
                            .Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        Email = table
                            .Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        PasswordHash = table
                            .Column<string>(type: "varchar(500)", maxLength: 500, nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        PhoneNumber = table
                            .Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        UserTypeId = table.Column<int>(type: "int", nullable: false),
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_user.User", x => x.Id);
                        table.ForeignKey(
                            name: "FK_user.User_enum.UserType_UserTypeId",
                            column: x => x.UserTypeId,
                            principalTable: "enum.UserType",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Restrict
                        );
                    }
                )
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder
                .CreateTable(
                    name: "offer.Advertisement",
                    columns: table => new
                    {
                        Id = table
                            .Column<int>(type: "int", nullable: false)
                            .Annotation(
                                "MySql:ValueGenerationStrategy",
                                MySqlValueGenerationStrategy.IdentityColumn
                            ),
                        Title = table
                            .Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        Description = table
                            .Column<string>(type: "longtext", nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                        UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                        CompanyId = table.Column<int>(type: "int", nullable: false),
                        PostedByUserId = table.Column<int>(type: "int", nullable: false),
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_offer.Advertisement", x => x.Id);
                        table.ForeignKey(
                            name: "FK_offer.Advertisement_company.Company_CompanyId",
                            column: x => x.CompanyId,
                            principalTable: "company.Company",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Cascade
                        );
                        table.ForeignKey(
                            name: "FK_offer.Advertisement_user.User_PostedByUserId",
                            column: x => x.PostedByUserId,
                            principalTable: "user.User",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Cascade
                        );
                    }
                )
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder
                .CreateTable(
                    name: "user.UserRole",
                    columns: table => new
                    {
                        Id = table
                            .Column<int>(type: "int", nullable: false)
                            .Annotation(
                                "MySql:ValueGenerationStrategy",
                                MySqlValueGenerationStrategy.IdentityColumn
                            ),
                        Role = table
                            .Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        AssignedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                        UserId = table.Column<int>(type: "int", nullable: false),
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_user.UserRole", x => x.Id);
                        table.ForeignKey(
                            name: "FK_user.UserRole_user.User_UserId",
                            column: x => x.UserId,
                            principalTable: "user.User",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Cascade
                        );
                    }
                )
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder
                .CreateTable(
                    name: "offer.Comment",
                    columns: table => new
                    {
                        Id = table
                            .Column<int>(type: "int", nullable: false)
                            .Annotation(
                                "MySql:ValueGenerationStrategy",
                                MySqlValueGenerationStrategy.IdentityColumn
                            ),
                        CommentText = table
                            .Column<string>(type: "longtext", nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        PostedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                        UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                        AdId = table.Column<int>(type: "int", nullable: false),
                        UserId = table.Column<int>(type: "int", nullable: false),
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_offer.Comment", x => x.Id);
                        table.ForeignKey(
                            name: "FK_offer.Comment_offer.Advertisement_AdId",
                            column: x => x.AdId,
                            principalTable: "offer.Advertisement",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Cascade
                        );
                        table.ForeignKey(
                            name: "FK_offer.Comment_user.User_UserId",
                            column: x => x.UserId,
                            principalTable: "user.User",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Cascade
                        );
                    }
                )
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder
                .CreateTable(
                    name: "offer.Email",
                    columns: table => new
                    {
                        Id = table
                            .Column<int>(type: "int", nullable: false)
                            .Annotation(
                                "MySql:ValueGenerationStrategy",
                                MySqlValueGenerationStrategy.IdentityColumn
                            ),
                        Subject = table
                            .Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        Body = table
                            .Column<string>(type: "longtext", nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        SentAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                        FromUserId = table.Column<int>(type: "int", nullable: false),
                        ToUserId = table.Column<int>(type: "int", nullable: false),
                        AdId = table.Column<int>(type: "int", nullable: true),
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_offer.Email", x => x.Id);
                        table.ForeignKey(
                            name: "FK_offer.Email_offer.Advertisement_AdId",
                            column: x => x.AdId,
                            principalTable: "offer.Advertisement",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Restrict
                        );
                        table.ForeignKey(
                            name: "FK_offer.Email_user.User_FromUserId",
                            column: x => x.FromUserId,
                            principalTable: "user.User",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Restrict
                        );
                        table.ForeignKey(
                            name: "FK_offer.Email_user.User_ToUserId",
                            column: x => x.ToUserId,
                            principalTable: "user.User",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Restrict
                        );
                    }
                )
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder
                .CreateTable(
                    name: "offer.JobApplication",
                    columns: table => new
                    {
                        Id = table
                            .Column<int>(type: "int", nullable: false)
                            .Annotation(
                                "MySql:ValueGenerationStrategy",
                                MySqlValueGenerationStrategy.IdentityColumn
                            ),
                        Message = table
                            .Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: true)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                        AdId = table.Column<int>(type: "int", nullable: false),
                        ApplicantUserId = table.Column<int>(type: "int", nullable: false),
                        StatusId = table.Column<int>(type: "int", nullable: false),
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_offer.JobApplication", x => x.Id);
                        table.ForeignKey(
                            name: "FK_offer.JobApplication_enum.ApplicationStatus_StatusId",
                            column: x => x.StatusId,
                            principalTable: "enum.ApplicationStatus",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Cascade
                        );
                        table.ForeignKey(
                            name: "FK_offer.JobApplication_offer.Advertisement_AdId",
                            column: x => x.AdId,
                            principalTable: "offer.Advertisement",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Cascade
                        );
                        table.ForeignKey(
                            name: "FK_offer.JobApplication_user.User_ApplicantUserId",
                            column: x => x.ApplicantUserId,
                            principalTable: "user.User",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Cascade
                        );
                    }
                )
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder
                .CreateTable(
                    name: "moderationLogs.ModerationLog",
                    columns: table => new
                    {
                        Id = table
                            .Column<int>(type: "int", nullable: false)
                            .Annotation(
                                "MySql:ValueGenerationStrategy",
                                MySqlValueGenerationStrategy.IdentityColumn
                            ),
                        Action = table
                            .Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        Description = table
                            .Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: true)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        Timestamp = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                        ActionTakenByUserId = table.Column<int>(type: "int", nullable: false),
                        AffectedUserId = table.Column<int>(type: "int", nullable: true),
                        AdId = table.Column<int>(type: "int", nullable: true),
                        UserRoleId = table.Column<int>(type: "int", nullable: false),
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_moderationLogs.ModerationLog", x => x.Id);
                        table.ForeignKey(
                            name: "FK_moderationLogs.ModerationLog_offer.Advertisement_AdId",
                            column: x => x.AdId,
                            principalTable: "offer.Advertisement",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Restrict
                        );
                        table.ForeignKey(
                            name: "FK_moderationLogs.ModerationLog_user.UserRole_UserRoleId",
                            column: x => x.UserRoleId,
                            principalTable: "user.UserRole",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Restrict
                        );
                        table.ForeignKey(
                            name: "FK_moderationLogs.ModerationLog_user.User_ActionTakenByUserId",
                            column: x => x.ActionTakenByUserId,
                            principalTable: "user.User",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Restrict
                        );
                        table.ForeignKey(
                            name: "FK_moderationLogs.ModerationLog_user.User_AffectedUserId",
                            column: x => x.AffectedUserId,
                            principalTable: "user.User",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Restrict
                        );
                    }
                )
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder
                .CreateTable(
                    name: "offer.Attachment",
                    columns: table => new
                    {
                        Id = table
                            .Column<int>(type: "int", nullable: false)
                            .Annotation(
                                "MySql:ValueGenerationStrategy",
                                MySqlValueGenerationStrategy.IdentityColumn
                            ),
                        FilePath = table
                            .Column<string>(type: "varchar(500)", maxLength: 500, nullable: false)
                            .Annotation("MySql:CharSet", "utf8mb4"),
                        ApplicationId = table.Column<int>(type: "int", nullable: false),
                        UserId = table.Column<int>(type: "int", nullable: false),
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_offer.Attachment", x => x.Id);
                        table.ForeignKey(
                            name: "FK_offer.Attachment_offer.JobApplication_ApplicationId",
                            column: x => x.ApplicationId,
                            principalTable: "offer.JobApplication",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Cascade
                        );
                        table.ForeignKey(
                            name: "FK_offer.Attachment_user.User_UserId",
                            column: x => x.UserId,
                            principalTable: "user.User",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Cascade
                        );
                    }
                )
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_company.Company_EmployeesId",
                table: "company.Company",
                column: "EmployeesId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_enum.ApplicationStatus_Value",
                table: "enum.ApplicationStatus",
                column: "Value",
                unique: true
            );

            migrationBuilder.CreateIndex(
                name: "IX_enum.CompanyEmployeeCount_Value",
                table: "enum.CompanyEmployeeCount",
                column: "Value",
                unique: true
            );

            migrationBuilder.CreateIndex(
                name: "IX_enum.UserType_Value",
                table: "enum.UserType",
                column: "Value",
                unique: true
            );

            migrationBuilder.CreateIndex(
                name: "IX_moderationLogs.ModerationLog_ActionTakenByUserId",
                table: "moderationLogs.ModerationLog",
                column: "ActionTakenByUserId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_moderationLogs.ModerationLog_AdId",
                table: "moderationLogs.ModerationLog",
                column: "AdId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_moderationLogs.ModerationLog_AffectedUserId",
                table: "moderationLogs.ModerationLog",
                column: "AffectedUserId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_moderationLogs.ModerationLog_UserRoleId",
                table: "moderationLogs.ModerationLog",
                column: "UserRoleId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_offer.Advertisement_CompanyId",
                table: "offer.Advertisement",
                column: "CompanyId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_offer.Advertisement_PostedByUserId",
                table: "offer.Advertisement",
                column: "PostedByUserId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_offer.Attachment_ApplicationId",
                table: "offer.Attachment",
                column: "ApplicationId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_offer.Attachment_UserId",
                table: "offer.Attachment",
                column: "UserId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_offer.Comment_AdId",
                table: "offer.Comment",
                column: "AdId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_offer.Comment_UserId",
                table: "offer.Comment",
                column: "UserId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_offer.Email_AdId",
                table: "offer.Email",
                column: "AdId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_offer.Email_FromUserId",
                table: "offer.Email",
                column: "FromUserId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_offer.Email_ToUserId",
                table: "offer.Email",
                column: "ToUserId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_offer.JobApplication_AdId",
                table: "offer.JobApplication",
                column: "AdId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_offer.JobApplication_ApplicantUserId",
                table: "offer.JobApplication",
                column: "ApplicantUserId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_offer.JobApplication_StatusId",
                table: "offer.JobApplication",
                column: "StatusId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_user.User_Email",
                table: "user.User",
                column: "Email",
                unique: true
            );

            migrationBuilder.CreateIndex(
                name: "IX_user.User_UserTypeId",
                table: "user.User",
                column: "UserTypeId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_user.UserRole_UserId",
                table: "user.UserRole",
                column: "UserId"
            );

            // User Type Enum Insert Statements
            migrationBuilder.Sql(
                @"
                INSERT INTO `Enum.UserType` (Id, Value, Name) VALUES 
                (1, 'USER', 'User'),
                (2, 'RECRUITER', 'Recruiter'),
                (3, 'MODERATOR', 'Moderator'),
                (4, 'ADMIN', 'Admin');
                "
            );

            // Application Status Enum Insert Statements
            migrationBuilder.Sql(
                @"
                INSERT INTO `Enum.ApplicationStatus` (Id, Value, Name) VALUES 
                (1, 'PENDING', 'Pending'),
                (2, 'REVIEWED', 'Reviewed'),
                (3, 'ACCEPTED', 'Accepted'),
                (4, 'REJECTED', 'Rejected');
                "
            );

            // Employee Company Count Enum Insert Statements
            migrationBuilder.Sql(
                @"
                INSERT INTO `Enum.CompanyEmployeeCount` (Id, Value, Name) VALUES 
                (1, 'EMPLOYEES_1_10', '1-10 Employees'),
                (2, 'EMPLOYEES_11_50', '11-50 Employees'),
                (3, 'EMPLOYEES_51_200', '51-200 Employees'),
                (4, 'EMPLOYEES_201_500', '201-500 Employees'),
                (5, 'EMPLOYEES_501_1000', '501-1,000 Employees'),
                (6, 'EMPLOYEES_1001_5000', '1,001-5,000 Employees'),
                (7, 'EMPLOYEES_5001_10000', '5,001-10,000 Employees'),
                (8, 'EMPLOYEES_10001Plus', '10,001+ Employees');
                "
            );

            // Users
            migrationBuilder.Sql(
                @"
                INSERT INTO `User.User` (Id, Firstname, Lastname, Email, PasswordHash, PhoneNumber, UserTypeId) VALUES 
                (1, 'John', 'Doe', 'johndoe@example.com', 'hashedpassword123', '123-456-7890', 1),
                (2, 'Jane', 'Smith', 'janesmith@example.com', 'hashedpassword456', '098-765-4321', 2),
                (3, 'Admin', 'User', 'admin@example.com', 'hashedpassword789', '555-555-5555', 3);
                "
            );

            // User Roles
            migrationBuilder.Sql(
                @"
                INSERT INTO `User.UserRole` (UserId, Role, AssignedAt) VALUES 
                (1, 'Basic User', NOW()),
                (2, 'Company Manager', NOW()),
                (3, 'Administrator', NOW());
                "
            );

            // Companies
            migrationBuilder.Sql(
                @"
                INSERT INTO `Company.Company` (CompanyName, Location, Domain, EmployeesId) VALUES 
                ('Tech Corp', 'New York', 'techcorp.com', 5),
                ('Business Inc.', 'San Francisco', 'businessinc.com', 3);
                "
            );

            // Advertisements
            migrationBuilder.Sql(
                @"
                INSERT INTO `Offer.Advertisement` (Title, Description, CompanyId, PostedByUserId, CreatedAt, UpdatedAt) VALUES 
                ('Software Developer Needed', 'We are looking for a skilled software developer to join our team.', 1, 2, NOW(), NOW()),
                ('Marketing Manager', 'Join our marketing team to help us grow our brand.', 2, 2, NOW(), NOW());
                "
            );

            // Job Applications
            migrationBuilder.Sql(
                @"
                INSERT INTO `Offer.JobApplication` (AdId, ApplicantUserId, Message, StatusId, CreatedAt) VALUES 
                (1, 1, 'I am very interested in this position and have the required skills.', 1, NOW()),
                (2, 1, 'Looking forward to discussing this opportunity with you!', 2, NOW());
                "
            );

            // Emails
            migrationBuilder.Sql(
                @"
                INSERT INTO `Offer.Email` (FromUserId, ToUserId, Subject, Body, SentAt, AdId) VALUES 
                (1, 2, 'Application for Software Developer Position', 'Hello, I would like to apply for the software developer position.', NOW(), 1),
                (2, 1, 'Re: Application for Software Developer Position', 'Thank you for your application. We will get back to you soon.', NOW(), 1);
                "
            );

            // Moderation Logs
            migrationBuilder.Sql(
                @"
                INSERT INTO `ModerationLogs.ModerationLog` (Action, ActionTakenByUserId, AffectedUserId, AdId, Description, Timestamp, UserRoleId) VALUES 
                ('User Banned', 3, 1, NULL, 'User was banned for violating terms of service.', NOW(), 3),
                ('Ad Deleted', 3, NULL, 2, 'Advertisement was removed due to inappropriate content.', NOW(), 3);
                "
            );

            // Comments
            migrationBuilder.Sql(
                @"
                INSERT INTO `Offer.Comment` (AdId, CommentText, UserId, PostedAt) VALUES 
                (1, 'This is a great job opportunity!', 2, NOW()),
                (2, 'Is remote work allowed?', 1, NOW());
                "
            );

            // Attachments
            migrationBuilder.Sql(
                @"
                INSERT INTO `Offer.Attachment` (ApplicationId, FilePath, UserId) VALUES 
                (1, '/uploads/resume_johndoe.pdf', 1),
                (2, '/uploads/coverletter_janesmith.pdf', 2);
            "
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "moderationLogs.ModerationLog");

            migrationBuilder.DropTable(name: "offer.Attachment");

            migrationBuilder.DropTable(name: "offer.Comment");

            migrationBuilder.DropTable(name: "offer.Email");

            migrationBuilder.DropTable(name: "user.UserRole");

            migrationBuilder.DropTable(name: "offer.JobApplication");

            migrationBuilder.DropTable(name: "enum.ApplicationStatus");

            migrationBuilder.DropTable(name: "offer.Advertisement");

            migrationBuilder.DropTable(name: "company.Company");

            migrationBuilder.DropTable(name: "user.User");

            migrationBuilder.DropTable(name: "enum.CompanyEmployeeCount");

            migrationBuilder.DropTable(name: "enum.UserType");
        }
    }
}
