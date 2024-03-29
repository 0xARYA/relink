import {Action, PayloadAction} from '@reduxjs/toolkit';

import {UserType, UserTier} from '@prisma/client';

import type {ClientSession} from '../../../pages/api/user/session';

export {UserType as ClientSessionType, UserTier as ClientSessionTier};

export type {ClientSession};

export enum SessionStateStatus {
  Idle = 'IDLE',
  Pending = 'PENDING',
  Ready = 'READY',
  Fail = 'FAIL',
}

export type SessionState =
  | {status: SessionStateStatus.Idle | SessionStateStatus.Pending}
  | ({status: SessionStateStatus.Ready} & ClientSession)
  | {status: SessionStateStatus.Fail; error: string};

export enum InitializeSessionActionType {
  Pending = 'session/initializeSession/pending',
  Success = 'session/initializeSession/success',
  Error = 'session/initializeSession/error',
}

export enum InitializeSessionActionError {
  ServerSideEnviroment = 'Failed to initialize session - cannot initialize session in server-side environment.',
  FingerprintFail = 'Failed to get session fingerprint - "getFingerprint" returned non truthy.',
  TokenFail = 'Failed to fetch session - "fetchSession" returned non truthy.',
  UnexpectedError = 'Failed to initialize session state - an uncaught error was thrown.',
}

export type InitializeSessionPendingAction = Action<InitializeSessionActionType.Pending>;

export type InitializeSessionErrorAction = PayloadAction<
  InitializeSessionActionError,
  InitializeSessionActionType.Error
>;

export type InitializeSessionSuccessAction = PayloadAction<
  ClientSession,
  InitializeSessionActionType.Success
>;

export type InitializeSessionAction =
  | InitializeSessionPendingAction
  | InitializeSessionErrorAction
  | InitializeSessionSuccessAction;
