import { createSelector } from 'reselect';
import { getAllMenuItems } from '../lib/utils';

const getPemissions = state => state.auth.user.permissions;
const getSettings = state => state.settings;

export const getVisibleMenuItems = createSelector(
    [getPemissions, getSettings],
    (permissions, settings) => {
        if (permissions) {
            const allMenuItem = getAllMenuItems(settings);
            return allMenuItem.filter(
                item => item.permission === 'all' || permissions.some(p => p.startsWith(item.permission))
            );
        }

        return [];
    }
);

export default getVisibleMenuItems;
