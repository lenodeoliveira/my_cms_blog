// assets
import { IconUsers } from '@tabler/icons';

// constant
const icons = {
    IconUsers: IconUsers,
};

//-----------------------|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||-----------------------//

export const users = {
    id: 'users-by-admin',
    title: 'Users',
    type: 'group',
    children: [
        {
            id: 'users',
            title: 'Users',
            type: 'item',
            url: '/users',
            icon: icons['IconUsers'],
            breadcrumbs: false
        }
    ]
};
