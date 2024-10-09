using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Core.Mapping;

namespace Infrastructure.DTO.Authentication
{
    public class LoginRequestDTO : IMap
    {
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string? Password { get; set; }

        public void Mapping(Profile profile)
        {
            profile
                .CreateMap<Core.Entities.User.User, LoginRequestDTO>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.PasswordHash))
                .ReverseMap();
        }
    }
}
