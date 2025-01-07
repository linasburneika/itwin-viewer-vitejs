/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { BrowserAuthorizationClientConfiguration } from "@itwin/browser-authorization";
import { BrowserAuthorizationClient } from "@itwin/browser-authorization";

const token = "";

export class Auth {
  private static _client: BrowserAuthorizationClient;

  public static initialize(
    options: BrowserAuthorizationClientConfiguration
  ): BrowserAuthorizationClient {
    if (!this._client) {
      this._client = new BrowserAuthorizationClient(options);
      this._client.getAccessToken = async () => {
        const token = await this.getAccessToken();
        return `bearer ${token}`;
      }
    }

    return this._client;
  }

  public static getClient(): BrowserAuthorizationClient {
    if (!this._client) {
      throw new Error(
        "Client not initialized. Please call `Auth.initialize(BrowserAuthorizationClientConfiguration)`"
      );
    }
    return this._client;
  }

  public static async handleSigninCallback(): Promise<void> {
    if (!this._client) {
      throw new Error(
        "Client not initialized. Please call `Auth.initialize(BrowserAuthorizationClientConfiguration)`"
      );
    }
    this._client.handleSigninCallback();
  }

  public static async getAccessToken() {
    return token || await fetch("https://connect-itwinjscodesandbox.bentley.com/api/userToken")
      .then((response) => response.json())
      .then((data) =>
        data._jwt
      );
    }
  }