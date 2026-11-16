import { loadRoot } from './request/rootLoader.server'
import { requestMiddleware } from './request/context.server'
import { App as CustomApp } from './Custom/components/pages/_App'
import type { ShouldRevalidateFunction } from 'react-router'
import favicon from './Custom/components/SiteLayout/assets/favicon.svg'
import { Statistics } from './components/Statistics'
import { errorPageStatusCode } from './components/Statistics/status'
import type * as React from 'react'
import { DocumentStyled } from './Custom/components/SiteLayout/styles'
import { SeoHeaders, unavailableSeoMeta } from './components/seo/SeoHeaders'

export const middleware = [requestMiddleware]
export const loader = loadRoot
// Refresh runtime configuration when leaving a prerendered page.
export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}) => defaultShouldRevalidate || currentUrl.pathname !== nextUrl.pathname
export const meta = unavailableSeoMeta
import type { ReactNode } from 'react'
import { SiteLayout } from './Custom/components/SiteLayout'
import {
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  useRouteLoaderData,
} from 'react-router'

const betterlyticsId = import.meta.env.BETTERLYTICS_SITE_ID

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const rootData = useRouteLoaderData<typeof loader>('root')
  return (
    <DocumentStyled lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/svg+xml" href={favicon} />
        <SeoHeaders />
        <Links />
        {betterlyticsId && (
          <script
            async
            src="https://panel.betterlytics.ru/analytics.js"
            data-site-id={betterlyticsId}
            data-server-url="https://panel.betterlytics.ru/event"
          />
        )}
      </head>
      <body>
        <CustomApp initialApolloState={rootData?.initialApolloState}>
          <SiteLayout>{children}</SiteLayout>
        </CustomApp>
        <ScrollRestoration />
        <Scripts />
      </body>
    </DocumentStyled>
  )
}
const App: React.FC = () => {
  return (
    <>
      <Outlet />
      <Statistics />
    </>
  )
}

export default App

export const ErrorBoundary: React.FC = () => {
  const error = useRouteError()
  return (
    <>
      <Statistics statusCode={errorPageStatusCode(error)} />
      <h1 tabIndex={-1}>
        {isRouteErrorResponse(error)
          ? `${error.status} — Не удалось открыть страницу`
          : 'Не удалось открыть страницу'}
      </h1>
      <p>Обновите страницу, чтобы попробовать ещё раз.</p>
      <a href="/">На главную</a>
    </>
  )
}
