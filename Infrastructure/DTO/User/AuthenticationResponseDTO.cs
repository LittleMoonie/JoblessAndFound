using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Core.Mapping;

namespace Infrastructure.DTO.User
{
    public class AuthenticationResponseDTO
    {
        public bool IsAuthenticated { get; set; }
        public UserDTO? User { get; set; }
        public string Message { get; set; } = null!;
    }
}
