import { DocumentTypeDecoration } from '@graphql-typed-document-node/core'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { fetchGraphql } from './fetcher'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: { input: any; output: any }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any }
}

export type AuthPayload = {
  __typename?: 'AuthPayload'
  message?: Maybe<Scalars['String']['output']>
  success?: Maybe<Scalars['Boolean']['output']>
  token?: Maybe<Scalars['String']['output']>
}

export type Balance = {
  __typename?: 'Balance'
  amount?: Maybe<Scalars['Float']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id?: Maybe<Scalars['ID']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  userId?: Maybe<Scalars['String']['output']>
}

export type CallIceServer = {
  __typename?: 'CallIceServer'
  credential?: Maybe<Scalars['String']['output']>
  urls: Array<Scalars['String']['output']>
  username?: Maybe<Scalars['String']['output']>
}

export type CallRoom = {
  __typename?: 'CallRoom'
  authenticatedOnly: Scalars['Boolean']['output']
  closed: Scalars['Boolean']['output']
  hasAccessCode: Scalars['Boolean']['output']
  iceServers: Array<CallIceServer>
  id: Scalars['ID']['output']
  isOwner: Scalars['Boolean']['output']
  sessionToken?: Maybe<Scalars['String']['output']>
  title: Scalars['String']['output']
}

export type CallRoomSettingsInput = {
  accessCode?: InputMaybe<Scalars['String']['input']>
  authenticatedOnly: Scalars['Boolean']['input']
  title: Scalars['String']['input']
}

export type ChatDialogue = {
  __typename?: 'ChatDialogue'
  channel: Scalars['String']['output']
  chatId: Scalars['String']['output']
  createdAt: Scalars['String']['output']
}

export type ChatMessage = {
  __typename?: 'ChatMessage'
  content: Scalars['String']['output']
  createdAt?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  pageUrl?: Maybe<Scalars['String']['output']>
  replyToId?: Maybe<Scalars['String']['output']>
  role: Scalars['String']['output']
  success?: Maybe<Scalars['Boolean']['output']>
  usage?: Maybe<ChatTokenUsage>
}

export type ChatMessageCreateTokenDataInput = {
  channel?: InputMaybe<DialogueChannel>
}

export type ChatMessageIndex = {
  __typename?: 'ChatMessageIndex'
  chatId: Scalars['String']['output']
  createdAt: Scalars['String']['output']
  id: Scalars['String']['output']
  pageUrl?: Maybe<Scalars['String']['output']>
  role: Scalars['String']['output']
  status: Scalars['String']['output']
  success?: Maybe<Scalars['Boolean']['output']>
  usage?: Maybe<ChatTokenUsage>
}

export type ChatMessageSendDataInput = {
  message: Scalars['String']['input']
  pageUrl?: InputMaybe<Scalars['String']['input']>
  token: Scalars['String']['input']
}

export type ChatMessageSubmitFeedbackDataInput = {
  contacts: Scalars['String']['input']
  message: Scalars['String']['input']
  token: Scalars['String']['input']
}

export type ChatResponse = {
  __typename?: 'ChatResponse'
  content: Scalars['String']['output']
  id: Scalars['String']['output']
  success: Scalars['Boolean']['output']
  usage: ChatTokenUsage
}

export type ChatTokenUsage = {
  __typename?: 'ChatTokenUsage'
  cachedTokens?: Maybe<Scalars['Float']['output']>
  inputTokens?: Maybe<Scalars['Float']['output']>
  outputTokens?: Maybe<Scalars['Float']['output']>
}

export type CoordsInput = {
  lat: Scalars['Float']['input']
  lng: Scalars['Float']['input']
}

export type CourseApplicationChallenge = {
  __typename?: 'CourseApplicationChallenge'
  token: Scalars['String']['output']
  waitMs: Scalars['Int']['output']
}

export type CourseApplicationInput = {
  audienceId?: InputMaybe<Scalars['String']['input']>
  formatId: Scalars['String']['input']
  message: Scalars['String']['input']
  token: Scalars['String']['input']
  topicIds: Array<Scalars['String']['input']>
  website?: InputMaybe<Scalars['String']['input']>
}

export type CourseApplicationReceipt = {
  __typename?: 'CourseApplicationReceipt'
  id: Scalars['String']['output']
  message: Scalars['String']['output']
}

export type CreateTransferInput = {
  amount: Scalars['Float']['input']
  title?: InputMaybe<Scalars['String']['input']>
  toUserId: Scalars['String']['input']
}

export type CurrentUserUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  fullname?: InputMaybe<Scalars['String']['input']>
  image?: InputMaybe<Scalars['String']['input']>
  intro?: InputMaybe<Scalars['String']['input']>
  isAiAgent?: InputMaybe<Scalars['Boolean']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  username?: InputMaybe<Scalars['String']['input']>
}

export enum DialogueChannel {
  Chat = 'chat',
  Feedback = 'feedback',
}

export type EthAccount = {
  __typename?: 'EthAccount'
  address?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id?: Maybe<Scalars['ID']['output']>
  userId?: Maybe<Scalars['String']['output']>
}

export type EthAccountAuthInput = {
  address: Scalars['String']['input']
  nonce: Scalars['String']['input']
  referrerToken?: InputMaybe<Scalars['String']['input']>
  signature: Scalars['String']['input']
}

export type EthAccountAuthPayload = {
  __typename?: 'EthAccountAuthPayload'
  message?: Maybe<Scalars['String']['output']>
  success?: Maybe<Scalars['Boolean']['output']>
  token?: Maybe<Scalars['String']['output']>
}

export type EthAccountNoncePayload = {
  __typename?: 'EthAccountNoncePayload'
  message?: Maybe<Scalars['String']['output']>
  nonce?: Maybe<Scalars['String']['output']>
}

export type File = {
  __typename?: 'File'
  CreatedBy?: Maybe<User>
  content?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdById?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  filename?: Maybe<Scalars['String']['output']>
  hash?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  mimetype: Scalars['String']['output']
  name?: Maybe<Scalars['String']['output']>
  path: Scalars['String']['output']
}

export type FileUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type FileWhereUniqueInput = {
  hash?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  path?: InputMaybe<Scalars['String']['input']>
}

export type JoinCallRoomInput = {
  accessCode?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
}

export type KbConcept = {
  __typename?: 'KBConcept'
  CreatedBy?: Maybe<User>
  Files: Array<KbConceptFile>
  code?: Maybe<Scalars['String']['output']>
  content?: Maybe<Scalars['String']['output']>
  createdAt: Scalars['DateTime']['output']
  createdById: Scalars['ID']['output']
  data?: Maybe<Scalars['Json']['output']>
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  image?: Maybe<Scalars['String']['output']>
  intro?: Maybe<Scalars['String']['output']>
  lat?: Maybe<Scalars['Float']['output']>
  lng?: Maybe<Scalars['Float']['output']>
  name: Scalars['String']['output']
  parentId?: Maybe<Scalars['ID']['output']>
  path?: Maybe<Scalars['String']['output']>
  quality?: Maybe<Scalars['Float']['output']>
  rootId?: Maybe<Scalars['ID']['output']>
  type?: Maybe<Scalars['String']['output']>
  updatedAt: Scalars['DateTime']['output']
  uri: Scalars['String']['output']
  visibility?: Maybe<KbConceptVisibility>
}

export type KbConceptFile = {
  __typename?: 'KBConceptFile'
  File?: Maybe<File>
  id: Scalars['ID']['output']
}

export type KbConceptOrderByInput = {
  createdAt?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  type?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export type KbConceptStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>
  equals?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

export enum KbConceptVisibility {
  Hidden = 'hidden',
  Public = 'public',
  Unpublished = 'unpublished',
}

export type KbConceptWhereInput = {
  code?: InputMaybe<KbConceptStringFilter>
  content?: InputMaybe<KbConceptStringFilter>
  coords?: InputMaybe<CoordsInput>
  createdById?: InputMaybe<KbConceptStringFilter>
  description?: InputMaybe<KbConceptStringFilter>
  id?: InputMaybe<KbConceptStringFilter>
  name?: InputMaybe<KbConceptStringFilter>
  parentId?: InputMaybe<KbConceptStringFilter>
  rootId?: InputMaybe<KbConceptStringFilter>
  type?: InputMaybe<KbConceptStringFilter>
  visibility?: InputMaybe<KbConceptVisibility>
}

export type KbConceptWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>
  uri?: InputMaybe<Scalars['String']['input']>
}

export type LlmImage = {
  __typename?: 'LLMImage'
  imageUrl: Scalars['String']['output']
}

export type LlmImageChoice = {
  __typename?: 'LLMImageChoice'
  message: LlmImageMessage
}

export enum LlmImageGenerationAspectRatioInput {
  AspectRatio_1_1 = 'AspectRatio_1_1',
  AspectRatio_16_9 = 'AspectRatio_16_9',
}

export enum LlmImageGenerationImageSizeInput {
  ImageSize_1K = 'ImageSize_1K',
}

export type LlmImageGenerationInput = {
  aspectRatio?: InputMaybe<LlmImageGenerationAspectRatioInput>
  imageSize?: InputMaybe<LlmImageGenerationImageSizeInput>
  model: LlmModel
  prompt: Scalars['String']['input']
  provider: LlmProvider
}

export type LlmImageMessage = {
  __typename?: 'LLMImageMessage'
  images: Array<LlmImage>
}

export type LlmImageResponse = {
  __typename?: 'LLMImageResponse'
  choices: Array<LlmImageChoice>
}

export enum LlmModel {
  Gemini3_1FlashImage = 'GEMINI3_1_FLASH_IMAGE',
}

export enum LlmProvider {
  Openrouter = 'OPENROUTER',
}

export type Mutation = {
  __typename?: 'Mutation'
  authEthAccount?: Maybe<EthAccountAuthPayload>
  authViaTelegram?: Maybe<AuthPayload>
  clearResolvedPageErrors: Scalars['Int']['output']
  closeCallRoom?: Maybe<CallRoom>
  createCallRoom?: Maybe<CallRoom>
  createChatToken: Scalars['String']['output']
  createReferrerToken: Scalars['String']['output']
  createTransfer?: Maybe<Transaction>
  createUser?: Maybe<User>
  deleteCallRoom?: Maybe<CallRoom>
  ethAccountNonce?: Maybe<EthAccountNoncePayload>
  joinCallRoom?: Maybe<CallRoom>
  kickCallRoomParticipant?: Maybe<CallRoom>
  llmImageGeneration: LlmImageResponse
  logStats?: Maybe<Array<SiteStatistic>>
  prepareCourseApplication: CourseApplicationChallenge
  requestTopUp?: Maybe<TopUpRequestPayload>
  sendChatMessage: ChatResponse
  signin?: Maybe<AuthPayload>
  signup?: Maybe<AuthPayload>
  singleUpload: File
  submitCourseApplication: CourseApplicationReceipt
  submitFeedback: Scalars['String']['output']
  topUpBalance?: Maybe<Balance>
  updateCallRoom?: Maybe<CallRoom>
  updateCurrentUser?: Maybe<User>
  updateFile: File
  updatePageError: PageError
  updateUser?: Maybe<User>
}

export type MutationAuthEthAccountArgs = {
  data: EthAccountAuthInput
}

export type MutationAuthViaTelegramArgs = {
  tgAuthData: TelegramAuthDataInput
}

export type MutationCloseCallRoomArgs = {
  id: Scalars['ID']['input']
}

export type MutationCreateCallRoomArgs = {
  data: CallRoomSettingsInput
}

export type MutationCreateChatTokenArgs = {
  data: ChatMessageCreateTokenDataInput
}

export type MutationCreateTransferArgs = {
  data: CreateTransferInput
}

export type MutationCreateUserArgs = {
  data: UserCreateDataInput
}

export type MutationDeleteCallRoomArgs = {
  id: Scalars['ID']['input']
}

export type MutationEthAccountNonceArgs = {
  address: Scalars['String']['input']
}

export type MutationJoinCallRoomArgs = {
  data: JoinCallRoomInput
  id: Scalars['ID']['input']
}

export type MutationKickCallRoomParticipantArgs = {
  id: Scalars['ID']['input']
  participantId: Scalars['ID']['input']
}

export type MutationLlmImageGenerationArgs = {
  input: LlmImageGenerationInput
}

export type MutationLogStatsArgs = {
  data: Scalars['Json']['input']
}

export type MutationSendChatMessageArgs = {
  data: ChatMessageSendDataInput
}

export type MutationSigninArgs = {
  data: UserSigninDataInput
  where: UserWhereUniqueInput
}

export type MutationSignupArgs = {
  data: UserSignupDataInput
}

export type MutationSingleUploadArgs = {
  data: SingleUploadInput
}

export type MutationSubmitCourseApplicationArgs = {
  input: CourseApplicationInput
}

export type MutationSubmitFeedbackArgs = {
  data: ChatMessageSubmitFeedbackDataInput
}

export type MutationTopUpBalanceArgs = {
  data: TopUpBalanceInput
}

export type MutationUpdateCallRoomArgs = {
  data: CallRoomSettingsInput
  id: Scalars['ID']['input']
}

export type MutationUpdateCurrentUserArgs = {
  data: CurrentUserUpdateInput
}

export type MutationUpdateFileArgs = {
  data: FileUpdateInput
  where: FileWhereUniqueInput
}

export type MutationUpdatePageErrorArgs = {
  count: Scalars['Int']['input']
  status: PageErrorStatus
  url: Scalars['String']['input']
}

export type MutationUpdateUserArgs = {
  data: UserUpdateDataInput
  where: UserWhereUniqueInput
}

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>
  endsWith?: InputMaybe<Scalars['String']['input']>
  equals?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  mode?: InputMaybe<QueryModeEnum>
  not?: InputMaybe<NestedStringNullableFilter>
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

export type PageError = {
  __typename?: 'PageError'
  count: Scalars['Int']['output']
  lastOccurredAt: Scalars['DateTime']['output']
  status?: Maybe<PageErrorStatus>
  statusCode?: Maybe<Scalars['Int']['output']>
  url: Scalars['String']['output']
}

export enum PageErrorSort {
  LastOccurredAt = 'LastOccurredAt',
  Url = 'Url',
}

export enum PageErrorStatus {
  Resolved = 'Resolved',
  Review = 'Review',
}

export type Query = {
  __typename?: 'Query'
  callRoom?: Maybe<CallRoom>
  callRooms: Array<CallRoom>
  chatDialogues: Array<ChatDialogue>
  chatMessage?: Maybe<ChatMessage>
  chatMessageIndexes: Array<ChatMessageIndex>
  chatMessages: Array<ChatMessage>
  concept?: Maybe<KbConcept>
  concepts: Array<KbConcept>
  file?: Maybe<File>
  health?: Maybe<Scalars['String']['output']>
  kBConceptsCount: Scalars['Int']['output']
  me?: Maybe<User>
  myTransactions?: Maybe<Array<Transaction>>
  myTransactionsCount?: Maybe<Scalars['Int']['output']>
  pageErrors: Array<PageError>
  user?: Maybe<User>
  users?: Maybe<Array<User>>
  usersCount?: Maybe<Scalars['Int']['output']>
}

export type QueryCallRoomArgs = {
  id: Scalars['ID']['input']
}

export type QueryChatMessageArgs = {
  chatId: Scalars['String']['input']
  messageId: Scalars['String']['input']
  token?: InputMaybe<Scalars['String']['input']>
}

export type QueryChatMessagesArgs = {
  chatId: Scalars['String']['input']
  token?: InputMaybe<Scalars['String']['input']>
}

export type QueryConceptArgs = {
  where: KbConceptWhereUniqueInput
}

export type QueryConceptsArgs = {
  orderBy?: InputMaybe<KbConceptOrderByInput>
  skip?: InputMaybe<Scalars['Int']['input']>
  take?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<KbConceptWhereInput>
}

export type QueryFileArgs = {
  where: FileWhereUniqueInput
}

export type QueryKbConceptsCountArgs = {
  where?: InputMaybe<KbConceptWhereInput>
}

export type QueryMyTransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>
  take?: InputMaybe<Scalars['Int']['input']>
}

export type QueryPageErrorsArgs = {
  sort?: InputMaybe<PageErrorSort>
}

export type QueryUserArgs = {
  where: UserWhereUniqueInput
}

export type QueryUsersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>
  take?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<UserWhereInput>
}

export type QueryUsersCountArgs = {
  where?: InputMaybe<UserWhereInput>
}

export enum QueryModeEnum {
  Default = 'default',
  Insensitive = 'insensitive',
}

export type SingleUploadInput = {
  directory?: InputMaybe<Scalars['String']['input']>
  file: Scalars['Upload']['input']
  name?: InputMaybe<Scalars['String']['input']>
}

export type SiteStatistic = {
  __typename?: 'SiteStatistic'
  id?: Maybe<Scalars['String']['output']>
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>
  endsWith?: InputMaybe<Scalars['String']['input']>
  equals?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  mode?: InputMaybe<QueryModeEnum>
  not?: InputMaybe<NestedStringNullableFilter>
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

export type TelegramAccount = {
  __typename?: 'TelegramAccount'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id?: Maybe<Scalars['ID']['output']>
  photo_url?: Maybe<Scalars['String']['output']>
  userId?: Maybe<Scalars['ID']['output']>
  username?: Maybe<Scalars['String']['output']>
}

export type TelegramAuthDataInput = {
  auth_date: Scalars['Int']['input']
  first_name?: InputMaybe<Scalars['String']['input']>
  hash: Scalars['String']['input']
  id: Scalars['String']['input']
  last_name?: InputMaybe<Scalars['String']['input']>
  photo_url?: InputMaybe<Scalars['String']['input']>
  referrerToken?: InputMaybe<Scalars['String']['input']>
  username?: InputMaybe<Scalars['String']['input']>
}

export type TopUpBalanceInput = {
  message: Scalars['String']['input']
  signature: Scalars['String']['input']
  txHash: Scalars['String']['input']
}

export type TopUpRequestPayload = {
  __typename?: 'TopUpRequestPayload'
  chainId: Scalars['Int']['output']
  message: Scalars['String']['output']
  recipientAddress: Scalars['String']['output']
  usdtContractAddress: Scalars['String']['output']
}

export type Transaction = {
  __typename?: 'Transaction'
  Children?: Maybe<Array<Transaction>>
  Parent?: Maybe<Transaction>
  User?: Maybe<User>
  amount: Scalars['Float']['output']
  balanceId: Scalars['String']['output']
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
  type: TransactionType
  userId: Scalars['String']['output']
}

export enum TransactionType {
  TopUp = 'TopUp',
  TransferIn = 'TransferIn',
  TransferOut = 'TransferOut',
}

export type User = {
  __typename?: 'User'
  Balance?: Maybe<Balance>
  EthAccount?: Maybe<EthAccount>
  TelegramAccount?: Maybe<TelegramAccount>
  certificateFingerprints?: Maybe<Array<Scalars['String']['output']>>
  content?: Maybe<Scalars['String']['output']>
  createdAt: Scalars['DateTime']['output']
  email?: Maybe<Scalars['String']['output']>
  fullname?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  image?: Maybe<Scalars['String']['output']>
  intro?: Maybe<Scalars['String']['output']>
  isAiAgent: Scalars['Boolean']['output']
  status: UserStatusEnum
  sudo?: Maybe<Scalars['Boolean']['output']>
  updatedAt: Scalars['DateTime']['output']
  username?: Maybe<Scalars['String']['output']>
}

export type UserCreateDataInput = {
  content?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  fullname?: InputMaybe<Scalars['String']['input']>
  image?: InputMaybe<Scalars['String']['input']>
  intro?: InputMaybe<Scalars['String']['input']>
  isAiAgent?: InputMaybe<Scalars['Boolean']['input']>
  password: Scalars['String']['input']
  status?: InputMaybe<UserStatusEnum>
  sudo?: InputMaybe<Scalars['Boolean']['input']>
  username?: InputMaybe<Scalars['String']['input']>
}

export type UserSigninDataInput = {
  password: Scalars['String']['input']
}

export type UserSignupDataInput = {
  email?: InputMaybe<Scalars['String']['input']>
  fullname?: InputMaybe<Scalars['String']['input']>
  isAiAgent?: InputMaybe<Scalars['Boolean']['input']>
  password: Scalars['String']['input']
  referrerToken?: InputMaybe<Scalars['String']['input']>
  username?: InputMaybe<Scalars['String']['input']>
}

export enum UserStatusEnum {
  Active = 'active',
  Blocked = 'blocked',
  Newbie = 'newbie',
}

export type UserUpdateDataInput = {
  content?: InputMaybe<Scalars['String']['input']>
  fullname?: InputMaybe<Scalars['String']['input']>
  image?: InputMaybe<Scalars['String']['input']>
  intro?: InputMaybe<Scalars['String']['input']>
  isAiAgent?: InputMaybe<Scalars['Boolean']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<UserStatusEnum>
  sudo?: InputMaybe<Scalars['Boolean']['input']>
  username?: InputMaybe<Scalars['String']['input']>
}

export type UserWhereInput = {
  content?: InputMaybe<StringNullableFilter>
  email?: InputMaybe<Scalars['String']['input']>
  fullname?: InputMaybe<StringNullableFilter>
  id?: InputMaybe<Scalars['String']['input']>
  image?: InputMaybe<StringNullableFilter>
  intro?: InputMaybe<StringNullableFilter>
  isAiAgent?: InputMaybe<Scalars['Boolean']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<UserStatusEnum>
  username?: InputMaybe<StringNullableFilter>
}

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  username?: InputMaybe<Scalars['String']['input']>
}

export type PrepareCourseApplicationMutationVariables = Exact<{
  [key: string]: never
}>

export type PrepareCourseApplicationMutation = {
  __typename?: 'Mutation'
  prepareCourseApplication: {
    __typename?: 'CourseApplicationChallenge'
    token: string
    waitMs: number
  }
}

export type SubmitCourseApplicationMutationVariables = Exact<{
  input: CourseApplicationInput
}>

export type SubmitCourseApplicationMutation = {
  __typename?: 'Mutation'
  submitCourseApplication: {
    __typename?: 'CourseApplicationReceipt'
    id: string
    message: string
  }
}

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<
    DocumentTypeDecoration<TResult, TVariables>['__apiType']
  >
  private value: string
  public __meta__?: Record<string, any> | undefined

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value)
    this.value = value
    this.__meta__ = __meta__
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value
  }
}

export const PrepareCourseApplicationDocument = new TypedDocumentString(`
    mutation PrepareCourseApplication {
  prepareCourseApplication {
    token
    waitMs
  }
}
    `)

export const usePrepareCourseApplicationMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    PrepareCourseApplicationMutation,
    TError,
    PrepareCourseApplicationMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    PrepareCourseApplicationMutation,
    TError,
    PrepareCourseApplicationMutationVariables,
    TContext
  >({
    mutationKey: ['PrepareCourseApplication'],
    mutationFn: (variables?: PrepareCourseApplicationMutationVariables) =>
      fetchGraphql<
        PrepareCourseApplicationMutation,
        PrepareCourseApplicationMutationVariables
      >(PrepareCourseApplicationDocument, variables)(),
    ...options,
  })
}

usePrepareCourseApplicationMutation.getKey = () => ['PrepareCourseApplication']

export const SubmitCourseApplicationDocument = new TypedDocumentString(`
    mutation SubmitCourseApplication($input: CourseApplicationInput!) {
  submitCourseApplication(input: $input) {
    id
    message
  }
}
    `)

export const useSubmitCourseApplicationMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    SubmitCourseApplicationMutation,
    TError,
    SubmitCourseApplicationMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    SubmitCourseApplicationMutation,
    TError,
    SubmitCourseApplicationMutationVariables,
    TContext
  >({
    mutationKey: ['SubmitCourseApplication'],
    mutationFn: (variables?: SubmitCourseApplicationMutationVariables) =>
      fetchGraphql<
        SubmitCourseApplicationMutation,
        SubmitCourseApplicationMutationVariables
      >(SubmitCourseApplicationDocument, variables)(),
    ...options,
  })
}

useSubmitCourseApplicationMutation.getKey = () => ['SubmitCourseApplication']
