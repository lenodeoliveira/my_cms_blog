// assets
import { IconBook2 } from '@tabler/icons';

// constant
const icons = {
    IconBook2: IconBook2
};

//-----------------------|| UTILITIES MENU ITEMS ||-----------------------//

export const contents = {
    id: 'contents',
    title: 'Contents',
    type: 'group',
    children: [
        {
            id: 'contents',
            title: 'Contents',
            type: 'item',
            url: '/contents',
            icon: icons['IconBook2'],
            breadcrumbs: false
        },
    ]
};
