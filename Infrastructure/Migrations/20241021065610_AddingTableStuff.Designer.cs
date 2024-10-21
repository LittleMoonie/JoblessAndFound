﻿// <auto-generated />
using System;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20241021065610_AddingTableStuff")]
    partial class AddingTableStuff
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Proxies:ChangeTracking", false)
                .HasAnnotation("Proxies:CheckEquality", false)
                .HasAnnotation("Proxies:LazyLoading", true)
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("Core.Entities.Authentication.JwtKey", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("KeyValue")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.ToTable("authentication.JwtKeys", (string)null);
                });

            modelBuilder.Entity("Core.Entities.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Domain")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("EmployeeCount")
                        .HasColumnType("longtext");

                    b.Property<int>("EmployeesId")
                        .HasColumnType("int");

                    b.Property<string>("Location")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("EmployeesId");

                    b.ToTable("company.Company", (string)null);
                });

            modelBuilder.Entity("Core.Entities.Enum.ApplicationStatus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("Value")
                        .IsUnique();

                    b.ToTable("enum.ApplicationStatus", (string)null);
                });

            modelBuilder.Entity("Core.Entities.Enum.CompanyEmployeeCount", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("Value")
                        .IsUnique();

                    b.ToTable("enum.CompanyEmployeeCount", (string)null);
                });

            modelBuilder.Entity("Core.Entities.Enum.UserType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("Value")
                        .IsUnique();

                    b.ToTable("enum.UserType", (string)null);
                });

            modelBuilder.Entity("Core.Entities.ModerationLogs.ModerationLog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Action")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<int>("ActionTakenByUserId")
                        .HasColumnType("int");

                    b.Property<int?>("AdId")
                        .HasColumnType("int");

                    b.Property<int?>("AffectedUserId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasMaxLength(1000)
                        .HasColumnType("varchar(1000)");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("UserRoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ActionTakenByUserId");

                    b.HasIndex("AdId");

                    b.HasIndex("AffectedUserId");

                    b.HasIndex("UserRoleId");

                    b.ToTable("moderationLogs.ModerationLog", (string)null);
                });

            modelBuilder.Entity("Core.Entities.Offer.Advertisement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("LongDescription")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("PostedByUserId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("PostedByUserId");

                    b.ToTable("offer.Advertisement", (string)null);
                });

            modelBuilder.Entity("Core.Entities.Offer.Attachment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ApplicationId")
                        .HasColumnType("int");

                    b.Property<string>("FilePath")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationId");

                    b.HasIndex("UserId");

                    b.ToTable("offer.Attachment", (string)null);
                });

            modelBuilder.Entity("Core.Entities.Offer.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AdId")
                        .HasColumnType("int");

                    b.Property<string>("CommentText")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("PostedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AdId");

                    b.HasIndex("UserId");

                    b.ToTable("offer.Comment", (string)null);
                });

            modelBuilder.Entity("Core.Entities.Offer.Email", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AdId")
                        .HasColumnType("int");

                    b.Property<string>("Body")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("FromUserId")
                        .HasColumnType("int");

                    b.Property<DateTime>("SentAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Subject")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<int>("ToUserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AdId");

                    b.HasIndex("FromUserId");

                    b.HasIndex("ToUserId");

                    b.ToTable("offer.Email", (string)null);
                });

            modelBuilder.Entity("Core.Entities.Offer.JobApplication", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AdId")
                        .HasColumnType("int");

                    b.Property<int>("ApplicantUserId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Message")
                        .HasMaxLength(1000)
                        .HasColumnType("varchar(1000)");

                    b.Property<int>("StatusId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AdId");

                    b.HasIndex("ApplicantUserId");

                    b.HasIndex("StatusId");

                    b.ToTable("offer.JobApplication", (string)null);
                });

            modelBuilder.Entity("Core.Entities.User.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("UserTypeId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("UserTypeId");

                    b.ToTable("user.User", (string)null);
                });

            modelBuilder.Entity("Core.Entities.User.UserRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("AssignedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("user.UserRole", (string)null);
                });

            modelBuilder.Entity("Core.Entities.Company", b =>
                {
                    b.HasOne("Core.Entities.Enum.CompanyEmployeeCount", "CompanyEmployeeCountEnum")
                        .WithMany("Companies")
                        .HasForeignKey("EmployeesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CompanyEmployeeCountEnum");
                });

            modelBuilder.Entity("Core.Entities.ModerationLogs.ModerationLog", b =>
                {
                    b.HasOne("Core.Entities.User.User", "ActionTakenBy")
                        .WithMany("ModerationLogsTaken")
                        .HasForeignKey("ActionTakenByUserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Core.Entities.Offer.Advertisement", "Advertisement")
                        .WithMany("ModerationLogs")
                        .HasForeignKey("AdId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Core.Entities.User.User", "AffectedUser")
                        .WithMany("ModerationLogsAffected")
                        .HasForeignKey("AffectedUserId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Core.Entities.User.UserRole", "UserRole")
                        .WithMany("ModerationLogs")
                        .HasForeignKey("UserRoleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("ActionTakenBy");

                    b.Navigation("Advertisement");

                    b.Navigation("AffectedUser");

                    b.Navigation("UserRole");
                });

            modelBuilder.Entity("Core.Entities.Offer.Advertisement", b =>
                {
                    b.HasOne("Core.Entities.Company", "Company")
                        .WithMany("Advertisements")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.User.User", "PostedBy")
                        .WithMany("Advertisements")
                        .HasForeignKey("PostedByUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");

                    b.Navigation("PostedBy");
                });

            modelBuilder.Entity("Core.Entities.Offer.Attachment", b =>
                {
                    b.HasOne("Core.Entities.Offer.JobApplication", "JobApplication")
                        .WithMany("Attachments")
                        .HasForeignKey("ApplicationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.User.User", "User")
                        .WithMany("Attachments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("JobApplication");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entities.Offer.Comment", b =>
                {
                    b.HasOne("Core.Entities.Offer.Advertisement", "Advertisement")
                        .WithMany("Comments")
                        .HasForeignKey("AdId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.User.User", "User")
                        .WithMany("Comments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Advertisement");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entities.Offer.Email", b =>
                {
                    b.HasOne("Core.Entities.Offer.Advertisement", "Advertisement")
                        .WithMany("Emails")
                        .HasForeignKey("AdId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Core.Entities.User.User", "FromUser")
                        .WithMany("EmailsSent")
                        .HasForeignKey("FromUserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Core.Entities.User.User", "ToUser")
                        .WithMany("EmailsReceived")
                        .HasForeignKey("ToUserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Advertisement");

                    b.Navigation("FromUser");

                    b.Navigation("ToUser");
                });

            modelBuilder.Entity("Core.Entities.Offer.JobApplication", b =>
                {
                    b.HasOne("Core.Entities.Offer.Advertisement", "Advertisement")
                        .WithMany("JobApplications")
                        .HasForeignKey("AdId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.User.User", "Applicant")
                        .WithMany("JobApplications")
                        .HasForeignKey("ApplicantUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Enum.ApplicationStatus", "ApplicationStatusEnum")
                        .WithMany("JobApplications")
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Advertisement");

                    b.Navigation("Applicant");

                    b.Navigation("ApplicationStatusEnum");
                });

            modelBuilder.Entity("Core.Entities.User.User", b =>
                {
                    b.HasOne("Core.Entities.Enum.UserType", "UserTypeEnum")
                        .WithMany("Users")
                        .HasForeignKey("UserTypeId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("UserTypeEnum");
                });

            modelBuilder.Entity("Core.Entities.User.UserRole", b =>
                {
                    b.HasOne("Core.Entities.User.User", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entities.Company", b =>
                {
                    b.Navigation("Advertisements");
                });

            modelBuilder.Entity("Core.Entities.Enum.ApplicationStatus", b =>
                {
                    b.Navigation("JobApplications");
                });

            modelBuilder.Entity("Core.Entities.Enum.CompanyEmployeeCount", b =>
                {
                    b.Navigation("Companies");
                });

            modelBuilder.Entity("Core.Entities.Enum.UserType", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("Core.Entities.Offer.Advertisement", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("Emails");

                    b.Navigation("JobApplications");

                    b.Navigation("ModerationLogs");
                });

            modelBuilder.Entity("Core.Entities.Offer.JobApplication", b =>
                {
                    b.Navigation("Attachments");
                });

            modelBuilder.Entity("Core.Entities.User.User", b =>
                {
                    b.Navigation("Advertisements");

                    b.Navigation("Attachments");

                    b.Navigation("Comments");

                    b.Navigation("EmailsReceived");

                    b.Navigation("EmailsSent");

                    b.Navigation("JobApplications");

                    b.Navigation("ModerationLogsAffected");

                    b.Navigation("ModerationLogsTaken");

                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("Core.Entities.User.UserRole", b =>
                {
                    b.Navigation("ModerationLogs");
                });
#pragma warning restore 612, 618
        }
    }
}