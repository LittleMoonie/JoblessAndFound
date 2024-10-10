using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Core.Mapping;
using Infrastructure.DTO.User;

namespace Infrastructure.DTO.Authentication
{
    public class LoginRequestDTO : IMap
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string? Password { get; set; }

        public void Mapping(Profile profile)
        {
            profile
                .CreateMap<Core.Entities.User.User, UserDTO>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.PasswordHash))
                .ReverseMap();
        }
    }

    public class LoginResponseDTO
    {
        public string Token { get; set; }
        public string Message { get; set; }
    }
}
