/* Copyright 2017 Apinf Oy
 This file is covered by the EUPL license.
 You may obtain a copy of the licence at
 https://joinup.ec.europa.eu/community/eupl/og_page/european-union-public-licence-eupl-v11 */

// Meteor packages imports
import { Template } from 'meteor/templating';

Template.apiCatalogGrid.onCreated(function () {
  const apis = Template.currentData().apis;

  const apiLogoIds = [];

  apis.forEach((api) => {
    if (api.apiLogoFileId) {
      apiLogoIds.push(api.apiLogoFileId);
    }
  });

  // Subscribe to API logo collection
  this.subscribe('apiLogoByIds', apiLogoIds);

  // Subscribe to usernames of API managers
  this.subscribe('managersUsername', apis);
});
