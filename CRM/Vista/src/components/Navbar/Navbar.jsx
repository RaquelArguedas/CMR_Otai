import React, { useState } from 'react';
import './Navbar.css';
import {
  FaBars,
  FaUserPlus,
  FaUserFriends,
  FaRegUserCircle,
  FaBookReader,
  FaTrashAlt
} from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as VcsIcons from 'react-icons/vsc';
import * as MdIcons from 'react-icons/md';
import {RiFolderAddFill} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
export const Navbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDividerSmall, setIsDividerSmall] = useState(false); // Nuevo estado para controlar el tamaño del Divider
  
  //const gotoMiCuenta = () => { navigate('/detalleMiCuenta'); }
  const toggle = () => {
    setIsOpen(!isOpen);
    setIsDividerSmall(!isDividerSmall); // Cambia el tamaño del Divider al hacer clic en el botón
  };
  const menuServicios = [
    {
      path: '/cotizacion',
      name: 'Cotizaciones',
      icon: <AiIcons.AiOutlineDollarCircle />
    },
    {
      path: '/',
      name: 'Evaluaciones',
      icon: <AiIcons.AiOutlineFileSearch />
    },
    {
      path: '/capacitacion',
      name: 'Capacitaciones',
      icon: <FaBookReader />
    }, {
      path: '/proyectos',
      name: 'Proyectos',
      icon: <RiFolderAddFill />
    }
  ];
    const meunuAnalisis = [
    
    {
      path: '/reportesFinancieros',
      name: 'Reporte financiero',
      icon: <VcsIcons.VscGraph />
    },
    {
      path: '/reportesRendimiento',
      name: 'Reportes de rendimiento',
      icon: <VcsIcons.VscGraphLine />
    }
  ];
  const menuEntidades = [
    {
      path: '/clientes',
      name: 'Clientes',
      icon: <FaUserFriends />
    },
    {
      path: '/crearUsuario',
      name: 'Usuarios',
      icon: <FaUserPlus  />
    },
    {
      path: '/funcionarios',
      name: 'Funcionarios',
      icon: <MdIcons.MdEngineering />
    }
  ];
  const menuHerramientas = [
    
    {
      path: '/papelera',
      name: 'Papelera',
      icon: <FaTrashAlt />
    }
  ];

  return (
    <div className="container">
      <div style={{ width: isOpen ? '300px' : '50px' }} className="sidebar">

        
        
      <div className="top_section">
          <div className="bars" style={{ marginLeft: isOpen ? '260px' : '0px', alignSelf: 'flex-start' }}>
            <FaBars onClick={toggle} />
          </div>
          <NavLink
            to={'/detalleMiCuenta'}
            className="linkP"
            activeClassName="active"
          >
            <div className="iconL"> <FaRegUserCircle /></div>
            <div style={{ display: isOpen ? 'block' : 'none' }} className="logo">
              {'Mi cuenta'}
            </div>
          </NavLink>
        </div>
        <h2 style={{ display: isOpen ? 'block' : 'none' }} className="text">
            Servicios
          </h2>
        <div className={`divider${isDividerSmall ? ' small' : ''}`}></div>

        {menuServicios.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active" // Corregido a 'activeClassName'
          >
            <div className="icon">{item.icon}</div>
            <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
              {item.name}
            </div>
          </NavLink>
        ))}

          <h2 style={{ display: isOpen ? 'block' : 'none' }} className="text">
            Análisis
          </h2>
        <div className={`divider${isDividerSmall ? ' small' : ''}`}></div>
        {meunuAnalisis.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active" // Corregido a 'activeClassName'
          >
            <div className="icon">{item.icon}</div>
            <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
              {item.name}
            </div>
          </NavLink>
        ))}
        <h2 style={{ display: isOpen ? 'block' : 'none' }} className="text">
            Entidades
          </h2>
        <div className={`divider${isDividerSmall ? ' small' : ''}`}></div>
        {menuEntidades.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active" // Corregido a 'activeClassName'
          >
            <div className="icon">{item.icon}</div>
            <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
              {item.name}
            </div>
          </NavLink>
        ))}
          <h2 style={{ display: isOpen ? 'block' : 'none' }} className="text">
            Herrramientas
          </h2>
        <div className={`divider${isDividerSmall ? ' small' : ''}`}></div>
        {menuHerramientas.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active" // Corregido a 'activeClassName'
          >
            <div className="icon">{item.icon}</div>
            <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};
