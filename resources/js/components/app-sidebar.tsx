import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder,Shield,Settings, LayoutGrid } from 'lucide-react';
import {usePage} from '@inertiajs/react';
import AppLogo from './app-logo';

export function AppSidebar() {

const {auth} = usePage().props;
const userRole = auth?.user?.role || 'user';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Manage Users',
        href: '/admin/users',
        icon: Settings,
    },
];

const SuperAdminNavItems: NavItem[] = [
    {
        title: 'System Controls',
        href: '/superadmin/system',
        icon: Shield,
    },
];

let roleBasedNavItems=[...mainNavItems];

if(userRole=='admin'){
    roleBasedNavItems=[...mainNavItems,...adminNavItems];
}else if(userRole=='superadmin'){
    roleBasedNavItems=[...mainNavItems,...SuperAdminNavItems,...adminNavItems];
}

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];


    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={roleBasedNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
