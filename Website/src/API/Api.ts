/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AuthenticationResponseDTO {
  isAuthenticated?: boolean;
  user?: UserDTO;
  message?: string | null;
}

export interface CompanyDTO {
  /** @format int32 */
  companyId?: number;
  companyName?: string | null;
  location?: string | null;
  domain?: string | null;
  /** @format int32 */
  employeesId?: number;
  offerAdvertisement?: OfferAdvertisementDTO[] | null;
}

export interface LoginRequestDTO {
  /**
   * @format email
   * @minLength 1
   */
  email: string;
  /**
   * @minLength 6
   * @maxLength 100
   */
  password: string;
}

export interface LoginResponseDTO {
  token?: string | null;
  message?: string | null;
}

export interface OfferAdvertisementDTO {
  /** @format int32 */
  offerAdvertisementId?: number;
  title?: string | null;
  description?: string | null;
  longDescription?: string | null;
  /** @format date-time */
  createdAt?: string | null;
  /** @format date-time */
  updatedAt?: string | null;
  /** @format int32 */
  companyId?: number;
  /** @format int32 */
  postedByUserId?: number;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

export interface UserDTO {
  /** @format int32 */
  userId?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  /** @format int32 */
  userTypeId?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title My API
 * @version v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Admin
     * @name AdminAdminEndpointList
     * @request GET:/api/Admin/admin-endpoint
     * @secure
     */
    adminAdminEndpointList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Admin/admin-endpoint`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminUserEndpointList
     * @request GET:/api/Admin/user-endpoint
     * @secure
     */
    adminUserEndpointList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Admin/user-endpoint`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthenticationLoginCreate
     * @request POST:/api/Authentication/login
     * @secure
     */
    authenticationLoginCreate: (data: LoginRequestDTO, params: RequestParams = {}) =>
      this.request<LoginResponseDTO, ProblemDetails | void>({
        path: `/api/Authentication/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthenticationLogoutCreate
     * @request POST:/api/Authentication/logout
     * @secure
     */
    authenticationLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Authentication/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthenticationStatusList
     * @request GET:/api/Authentication/status
     * @secure
     */
    authenticationStatusList: (params: RequestParams = {}) =>
      this.request<AuthenticationResponseDTO, any>({
        path: `/api/Authentication/status`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Company
     * @name CompanyGetCompanyByIdList
     * @request GET:/api/Company/GetCompanyById
     * @secure
     */
    companyGetCompanyByIdList: (
      query?: {
        /** @format int32 */
        companyId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CompanyDTO, any>({
        path: `/api/Company/GetCompanyById`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Company
     * @name CompanyAddCompanyCreate
     * @request POST:/api/Company/AddCompany
     * @secure
     */
    companyAddCompanyCreate: (
      query?: {
        CompanyName?: string;
        Location?: string;
        Domain?: string;
        /** @format int32 */
        EmployeesId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, ProblemDetails>({
        path: `/api/Company/AddCompany`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Offer
     * @name OfferGetOfferByCompanyIdList
     * @request GET:/api/Offer/GetOfferByCompanyId
     * @secure
     */
    offerGetOfferByCompanyIdList: (
      query?: {
        /** @format int32 */
        CompanyId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Offer/GetOfferByCompanyId`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Offer
     * @name OfferAddOfferCreate
     * @request POST:/api/Offer/AddOffer
     * @secure
     */
    offerAddOfferCreate: (
      query?: {
        /** @format int32 */
        OfferAdvertisementId?: number;
        Description?: string;
        LongDescription?: string;
        Title?: string;
        /** @format date-time */
        CreatedAt?: string;
        /** @format date-time */
        UpdatedAt?: string;
        /** @format int32 */
        CompanyId?: number;
        /** @format int32 */
        PostedByUserId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Offer/AddOffer`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserGetUserByIdList
     * @request GET:/api/User/GetUserById
     * @secure
     */
    userGetUserByIdList: (
      query?: {
        /** @format int32 */
        userId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserDTO, any>({
        path: `/api/User/GetUserById`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserAddUserCreate
     * @request POST:/api/User/AddUser
     * @secure
     */
    userAddUserCreate: (
      query?: {
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
        phoneNumber?: string;
        countryCode?: string;
        /** @format int32 */
        userTypeId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/User/AddUser`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),
  };
}
