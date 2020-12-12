import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { GetAuthToken } from './auth.link';
import { environment } from '../../../environments/environment';

const GRAPHQL_ENDPOINT = environment.socket;

const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true,
  connectionParams: { 'x-token': GetAuthToken() },
});

export const WSLink = new WebSocketLink(client);
