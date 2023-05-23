// assets
import { IconAlbum } from '@tabler/icons';

// constant
const icons = {
    IconAlbum: IconAlbum
};

//-----------------------|| UTILITIES MENU ITEMS ||-----------------------//

export const mediaLibrary = {
    id: 'mediaLibrary',
    title: 'mediaLibrary',
    type: 'group',
    children: [
        {
            id: 'mediaLibrary',
            title: 'mediaLibrary',
            type: 'item',
            url: '/media-library',
            icon: icons['IconAlbum'],
            breadcrumbs: false
        },
    ]
};
