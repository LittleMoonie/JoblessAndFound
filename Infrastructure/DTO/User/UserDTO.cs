using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Core.Entities.Enum;
using Core.Entities.User;
using Core.Mapping;

namespace Infrastructure.DTO.User
{
    public class UserDTO : IMap
    {
        public int UserId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public UserTypeEnum UserType { get; set; }

        public void Mapping(Profile profile)
        {
            profile
                .CreateMap<Core.Entities.User.User, UserDTO>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.PasswordHash))
                .ForMember(
                    dest => dest.UserType,
                    opt => opt.MapFrom(src => (UserTypeEnum)src.UserTypeId)
                ) // Map UserTypeId to UserTypeEnum
                .ReverseMap()
                .ForMember(dest => dest.UserTypeId, opt => opt.MapFrom(src => (int)src.UserType)); // Map UserTypeEnum to UserTypeId
        }
    }
}
