/**********************************************************************
 * Copyright (c) 2022 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ***********************************************************************/
import 'reflect-metadata';

import { AxiosInstance } from 'axios';
import { Container } from 'inversify';
import { devfileModule } from '../devfile/devfile-module';
import { fetchModule } from '../fetch/fetch-module';
import { githubModule } from '../github/github-module';
import { resolveModule } from '../resolve/resolve-module';
import { pluginRegistryModule } from '../plugin-registry/plugin-registry-module';
import { bitbucketModule } from '../bitbucket/bitbucket-module';
import { bitbucketServerModule } from '../bitbucket-server/bitbucket-server-module';

/**
 * Manage all bindings for inversify
 */
export class InversifyBinding {
  private container: Container;

  public async initBindings(options: InversifyBindingOptions): Promise<Container> {
    this.container = new Container();

    this.container.load(devfileModule);
    this.container.load(fetchModule);
    this.container.load(githubModule);
    this.container.load(bitbucketModule);
    this.container.load(bitbucketServerModule);
    this.container.load(resolveModule);
    this.container.load(pluginRegistryModule);

    this.container.bind(Symbol.for('AxiosInstance')).toConstantValue(options.axiosInstance);
    this.container.bind('string').toConstantValue(options.pluginRegistryUrl).whenTargetNamed('PLUGIN_REGISTRY_URL');

    return this.container;
  }
}

/**
 * Options for inversify bindings
 */
export interface InversifyBindingOptions {
  pluginRegistryUrl: string;
  axiosInstance: AxiosInstance;
}
