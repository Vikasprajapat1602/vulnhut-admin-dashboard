import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsGrid1X2Fill, BsFillArchiveFill, BsPeopleFill, BsMenuButtonWideFill, BsFillGearFill, BsFolderFill } from 'react-icons/bs';


export default function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <>
      {/* Overlay for mobile */}
      <div className={`sidebar-overlay${openSidebarToggle ? ' show' : ''}`} onClick={OpenSidebar}></div>
      <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
        <div className="sidebar-title">
          <div className="sidebar-brand gradient-text">
            <BsGrid1X2Fill className="icon_header" /> VULNHUT ADMIN
          </div>
          <span className="icon close_icon" onClick={OpenSidebar}>✕</span>
        </div>
        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <NavLink to="/dashboard" activeClassName="active">
              <BsGrid1X2Fill className="icon" /> Dashboard
            </NavLink>
          </li>
          <li className="sidebar-list-item">
            <NavLink to="/courses" activeClassName="active">
              <BsFillArchiveFill className="icon" /> Courses
            </NavLink>
          </li>
          <li className="sidebar-list-item">
            <NavLink to="/users" activeClassName="active">
              <BsPeopleFill className="icon" /> Users
            </NavLink>
          </li>
          <li className="sidebar-list-item">
            <NavLink to="/reports" activeClassName="active">
              <BsMenuButtonWideFill className="icon" /> Reports
            </NavLink>
          </li>
          <li className="sidebar-list-item">
            <NavLink to="/files" activeClassName="active">
              <BsFolderFill className="icon" /> File Manager
            </NavLink>
          </li>
          <li className="sidebar-list-item">
            <NavLink to="/settings" activeClassName="active">
              <BsFillGearFill className="icon" /> Settings
            </NavLink>
          </li>
        </ul>
      </aside>
    </>
  );
}
