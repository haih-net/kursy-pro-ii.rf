import type { FC } from 'react'
import { AiOverview } from './AiOverview'
import { Models } from './Models'
import { Orientation } from './Orientation'
import { Dialogue } from './Dialogue'
import { Verification } from './Verification'
import { Research } from './Research'
import { Documents } from './Documents'
import { Spreadsheets } from './Spreadsheets'
import { Presentations } from './Presentations'
import { Context } from './Context'
import { ToolMap } from './ToolMap'
import { Connectors } from './Connectors'
import { Skills } from './Skills'
import { Gmail } from './Gmail'
import { GoogleCalendar } from './GoogleCalendar'
import { GoogleDrive } from './GoogleDrive'
import { GoogleWorkflow } from './GoogleWorkflow'
import { Scheduled } from './Scheduled'
import { Monitoring } from './Monitoring'
import { Telegram } from './Telegram'
import { ImageBasics } from './ImageBasics'
import { ImageBrief } from './ImageBrief'
import { ImageEditing } from './ImageEditing'
import { ImageSeries } from './ImageSeries'
import { ImagePublishing } from './ImagePublishing'
import { Desktop } from './Desktop'
import { CodexIntro } from './CodexIntro'
import { ProjectFiles } from './ProjectFiles'
import { SitesOverview } from './SitesOverview'
import { SiteBuild } from './SiteBuild'
import { SitePublish } from './SitePublish'
import { SmallService } from './SmallService'
import { ApiIntegration } from './ApiIntegration'
import { AgentFoundations } from './AgentFoundations'
import { AgentBuild } from './AgentBuild'
import { AgentTesting } from './AgentTesting'
import { Workflow } from './Workflow'

export const topicComponents: Readonly<Record<string, FC>> = {
  'ai-overview': AiOverview,
  models: Models,
  'course-map': Orientation,
  dialogue: Dialogue,
  verification: Verification,
  research: Research,
  documents: Documents,
  spreadsheets: Spreadsheets,
  presentations: Presentations,
  context: Context,
  'tool-map': ToolMap,
  connectors: Connectors,
  skills: Skills,
  gmail: Gmail,
  'google-calendar': GoogleCalendar,
  'google-drive': GoogleDrive,
  'google-workflow': GoogleWorkflow,
  scheduled: Scheduled,
  monitoring: Monitoring,
  telegram: Telegram,
  'image-basics': ImageBasics,
  'image-brief': ImageBrief,
  'image-editing': ImageEditing,
  'image-series': ImageSeries,
  'image-publishing': ImagePublishing,
  desktop: Desktop,
  'codex-intro': CodexIntro,
  'project-files': ProjectFiles,
  'sites-overview': SitesOverview,
  'site-build': SiteBuild,
  'site-publish': SitePublish,
  'small-service': SmallService,
  'api-integration': ApiIntegration,
  'agent-foundations': AgentFoundations,
  'agent-build': AgentBuild,
  'agent-testing': AgentTesting,
  workflow: Workflow,
}
