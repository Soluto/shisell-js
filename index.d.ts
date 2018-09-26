declare module 'shisell' {
    export type AnalyticsEventModel = {
        Name: string;
        Scope: string;
        ExtraData: {[key: string]: any};
        MetaData: {[key: string]: any};
        Identities: {[key: string]: any};
    };

    export type DispatchAnalytics = (eventName?: string, context?: AnalyticsContext) => Promise<AnalyticsEventModel>;

    export type EventModelWriter<T> = (event: AnalyticsEventModel) => T;

    export type AnalyticsFilter = (
        dispatcher: AnalyticsDispatcher
    ) => Promise<AnalyticsDispatcher> | AnalyticsDispatcher;


    export class AnalyticsContext {
        Scopes: string[];
        ExtraData: {[key: string]: any};
        MetaData: {[key: string]: any};
        Filters: AnalyticsFilter[];
        Identities: {[key: string]: any};
    }

    export type AnalyticsExtender = (dispatcher: AnalyticsDispatcher) => AnalyticsDispatcher;

    export class AnalyticsDispatcher {
        constructor(dispatch: DispatchAnalytics, context?: AnalyticsContext);
        dispatch: DispatchAnalytics;
        extend: (...extenders: AnalyticsExtender[]) => AnalyticsDispatcher;

        // todo: delete deprecated
        withContext(context: AnalyticsContext): AnalyticsDispatcher;
        createScoped(scope: string): AnalyticsDispatcher;
        withExtra(key: string, value: any): AnalyticsDispatcher;
        withExtras(extras: object): AnalyticsDispatcher;
        withFilter(filter: AnalyticsFilter): AnalyticsDispatcher;
        withFilters(filter: AnalyticsFilter[]): AnalyticsDispatcher;
        withMeta(key: string, value: any): AnalyticsDispatcher;
        withIdentity(key: string, value: any): AnalyticsDispatcher;
        withIdentities(identities: {[key: string]: any}): AnalyticsDispatcher;
    }

    export function createRootDispatcher<T>(writer: EventModelWriter<T>, rootContext?: AnalyticsContext): AnalyticsDispatcher;

    export var writers: {
        console: EventModelWriter<void>;
        mixpanel: (id: string) => EventModelWriter<void>;
    };

    export var extenders: {
        withContext(context: AnalyticsContext): AnalyticsExtender;
        createScoped(scope: string): AnalyticsExtender;
        withExtra(key: string, value: any): AnalyticsExtender;
        withExtras(extras: object): AnalyticsExtender;
        withFilter(filter: AnalyticsFilter): AnalyticsExtender;
        withFilters(filter: AnalyticsFilter[]): AnalyticsExtender;
        withMeta(key: string, value: any): AnalyticsExtender;
        withIdentity(key: string, value: any): AnalyticsExtender;
        withIdentities(identities: {[key: string]: any}): AnalyticsExtender;
    }
}
