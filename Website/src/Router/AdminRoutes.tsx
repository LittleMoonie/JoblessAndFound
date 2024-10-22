import React from 'react';
import AdminPage from '../Views/AdminPage';
import ManageUsers from '../Views/Admin/User/ManageUsers';
import ManageCompanies from '../Views/Admin/Company/ManageCompanies';
import VerifyCompanies from '../Views/Admin/Company/VerifyCompanies';
import ManageOffers from '../Views/Admin/Offer/ManageOffers';
import FlaggedOffers from '../Views/Admin/Offer/FlaggedOffers';
import ReportedOffers from '../Views/Admin/Offer/ReportedOffers';
import ManagePosts from '../Views/Admin/Posts/ManagePosts';
import FlaggedPosts from '../Views/Admin/Posts/FlaggedPosts';
import ReportedPosts from '../Views/Admin/Posts/ReportedPosts';
import ManageThemes from '../Views/Admin/Job/ManageThemes';
import AnalyticsDashboard from '../Views/Admin/Analytic/Analytics';
import ManageRoles from '../Views/Admin/Role/ManageRoles';
import ManageReports from '../Views/Admin/Report/ManageReports';
import ManageNotifications from '../Views/Admin/Notification/ManageNotification';

const AdminRoutes = [
  {
    path: '/admin',
    element: <AdminPage />,
    requireduserTypeIds: [4, 3], // Admin (4) and Moderator (3) can access this
    children: [
      { path: 'users', element: <ManageUsers />, requireduserTypeIds: [4] }, // Only Admin can access
      { path: 'companies', element: <ManageCompanies />, requireduserTypeIds: [4] },
      { path: 'verify-companies', element: <VerifyCompanies />, requireduserTypeIds: [4] },
      { path: 'offers', element: <ManageOffers />, requireduserTypeIds: [3, 4] }, // Both Admin and Moderator can access
      { path: 'flagged-offers', element: <FlaggedOffers />, requireduserTypeIds: [4] },
      { path: 'reported-offers', element: <ReportedOffers />, requireduserTypeIds: [4] },
      { path: 'posts', element: <ManagePosts />, requireduserTypeIds: [3, 4] }, // Both Admin and Moderator
      { path: 'flagged-posts', element: <FlaggedPosts />, requireduserTypeIds: [4] },
      { path: 'reported-posts', element: <ReportedPosts />, requireduserTypeIds: [4] },
      { path: 'themes', element: <ManageThemes />, requireduserTypeIds: [4] },
      { path: 'analytics', element: <AnalyticsDashboard />, requireduserTypeIds: [4] },
      { path: 'roles', element: <ManageRoles />, requireduserTypeIds: [4] },
      { path: 'reports', element: <ManageReports />, requireduserTypeIds: [4] },
      { path: 'notifications', element: <ManageNotifications />, requireduserTypeIds: [4] },
    ],
  },
];

// Export permissions to map userTypeId to role permissions
export const AdminRoutePermissions = {
  users: [4], // Only Admin
  companies: [4],
  'verify-companies': [4],
  offers: [3, 4], // Both Admin and Moderator
  'flagged-offers': [4],
  'reported-offers': [4],
  posts: [3, 4], // Both Admin and Moderator
  'flagged-posts': [4],
  'reported-posts': [4],
  themes: [4],
  analytics: [4],
  roles: [4],
  reports: [4],
  notifications: [4],
};

export default AdminRoutes;
