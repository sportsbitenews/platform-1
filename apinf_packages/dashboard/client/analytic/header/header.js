
/* Copyright 2017 Apinf Oy
 This file is covered by the EUPL license.
 You may obtain a copy of the licence at
 https://joinup.ec.europa.eu/community/eupl/og_page/european-union-public-licence-eupl-v11 */

// Meteor packages imports
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Collection imports
import Apis from '/apinf_packages/apis/collection';
import Proxies from '/apinf_packages/proxies/collection';
import ProxyBackends from '/apinf_packages/proxy_backends/collection';

Template.apiAnalyticPageHeader.onCreated(function () {
  const instance = this;

  instance.lastUpdateTime = new ReactiveVar();

  // Get ID of current proxy backend
  const proxyBackendId = instance.data.proxyBackendId;
  // Get instance of Proxy Backend
  const proxyBackend = ProxyBackends.findOne(proxyBackendId);

  // make sure proxy backend exists and
  // Get IDs of relevant API and Proxy
  instance.apiId = proxyBackend && proxyBackend.apiId;
  instance.proxyId = proxyBackend && proxyBackend.proxyId;

  Meteor.call('lastUpdateTime', { proxyBackendId }, (error, result) => {
    // Save value
    instance.lastUpdateTime.set(result);
  });
});

Template.apiAnalyticPageHeader.helpers({
  api () {
    // Get ID
    const apiId = Template.instance().apiId;

    return Apis.findOne(apiId);
  },
  proxyName () {
    // Get ID
    const proxyId = Template.instance().proxyId;
    const proxy = Proxies.findOne(proxyId);

    if (proxy) {
      return proxy.name;
    }

    return '';
  },
  lastUpdateTime () {
    const instance = Template.instance();

    return instance.lastUpdateTime.get();
  },
  displayLastUpdateTime () {
    const timeframe = FlowRouter.getQueryParam('timeframe');
    // Not display info about Last update if selected "Yesterday" or Today
    return timeframe !== '48' && timeframe !== '12';
  },
});
