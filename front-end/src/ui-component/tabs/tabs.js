import React from 'react'
import { Tab, Tabs } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

export const AntTabs = withStyles({})(Tabs);
  
export const AntTab = withStyles(() => ({
    root: {
        width: 100,
        minWidth: 100,
        fontSize: '.675rem'
    }
}))(Tab)