import type { CourseSection, TopicMeta } from './catalog'
import { aiOverviewTopic } from './topics/AiOverview/data'
import { modelsTopic } from './topics/Models/data'
import { orientationTopic } from './topics/Orientation/data'
import { dialogueTopic } from './topics/Dialogue/data'
import { verificationTopic } from './topics/Verification/data'
import { researchTopic } from './topics/Research/data'
import { documentsTopic } from './topics/Documents/data'
import { spreadsheetsTopic } from './topics/Spreadsheets/data'
import { presentationsTopic } from './topics/Presentations/data'
import { contextTopic } from './topics/Context/data'
import { toolMapTopic } from './topics/ToolMap/data'
import { connectorsTopic } from './topics/Connectors/data'
import { skillsTopic } from './topics/Skills/data'
import { gmailTopic } from './topics/Gmail/data'
import { googleCalendarTopic } from './topics/GoogleCalendar/data'
import { googleDriveTopic } from './topics/GoogleDrive/data'
import { googleWorkflowTopic } from './topics/GoogleWorkflow/data'
import { scheduledTopic } from './topics/Scheduled/data'
import { monitoringTopic } from './topics/Monitoring/data'
import { telegramTopic } from './topics/Telegram/data'
import { imageBasicsTopic } from './topics/ImageBasics/data'
import { imageBriefTopic } from './topics/ImageBrief/data'
import { imageEditingTopic } from './topics/ImageEditing/data'
import { imageSeriesTopic } from './topics/ImageSeries/data'
import { imagePublishingTopic } from './topics/ImagePublishing/data'
import { desktopTopic } from './topics/Desktop/data'
import { codexIntroTopic } from './topics/CodexIntro/data'
import { projectFilesTopic } from './topics/ProjectFiles/data'
import { sitesOverviewTopic } from './topics/SitesOverview/data'
import { siteBuildTopic } from './topics/SiteBuild/data'
import { sitePublishTopic } from './topics/SitePublish/data'
import { smallServiceTopic } from './topics/SmallService/data'
import { apiIntegrationTopic } from './topics/ApiIntegration/data'
import { agentFoundationsTopic } from './topics/AgentFoundations/data'
import { agentBuildTopic } from './topics/AgentBuild/data'
import { agentTestingTopic } from './topics/AgentTesting/data'
import { workflowTopic } from './topics/Workflow/data'

export const courseSections: readonly CourseSection[] = [
  {
    id: 'foundations',
    title: 'ИИ, модели и первые разговоры',
    description:
      'Разобраться в устройстве ИИ, сравнить чаты и научиться объяснять свою задачу.',
    topics: [aiOverviewTopic, modelsTopic, orientationTopic, dialogueTopic],
  },
  {
    id: 'information',
    title: 'Поиск, проверка и документы',
    description:
      'Получать сведения, находить подтверждения и сохранять смысл исходных материалов.',
    topics: [verificationTopic, researchTopic, documentsTopic],
  },
  {
    id: 'deliverables',
    title: 'Файлы и материалы для работы',
    description:
      'Готовить таблицы, презентации и долгие задачи с сохранёнными договорённостями.',
    topics: [spreadsheetsTopic, presentationsTopic, contextTopic],
  },
  {
    id: 'tools',
    title: 'Инструменты, плагины и навыки',
    description:
      'Понять, чем можно расширить чат и как выбрать нужные возможности.',
    topics: [toolMapTopic, connectorsTopic, skillsTopic],
  },
  {
    id: 'google',
    title: 'Google: почта, календарь и файлы',
    description:
      'Освоить каждое подключение отдельно, затем собрать подготовку к встрече из трёх сервисов.',
    topics: [
      gmailTopic,
      googleCalendarTopic,
      googleDriveTopic,
      googleWorkflowTopic,
    ],
  },
  {
    id: 'automation',
    title: 'Scheduled и Telegram',
    description:
      'Запускать работу в нужное время и доставлять результат в понятное место.',
    topics: [scheduledTopic, monitoringTopic, telegramTopic],
  },
  {
    id: 'images',
    title: 'Генерация и редактирование изображений',
    description:
      'Пройти путь от идеи к управляемому изображению и серии материалов для публикации.',
    topics: [
      imageBasicsTopic,
      imageBriefTopic,
      imageEditingTopic,
      imageSeriesTopic,
      imagePublishingTopic,
    ],
  },
  {
    id: 'desktop',
    title: 'ChatGPT на компьютере и знакомство с Codex',
    description:
      'Подготовить рабочую среду, разобраться в локальных файлах и научиться проверять изменения.',
    topics: [desktopTopic, codexIntroTopic, projectFilesTopic],
  },
  {
    id: 'development',
    title: 'Сайты и небольшие сервисы',
    description:
      'Собрать страницу, опубликовать её и перейти к приложениям с данными и внешними функциями.',
    topics: [
      sitesOverviewTopic,
      siteBuildTopic,
      sitePublishTopic,
      smallServiceTopic,
      apiIntegrationTopic,
    ],
  },
  {
    id: 'agents',
    title: 'Агенты и работа команды',
    description:
      'Разобрать устройство агента, собрать помощника и проверить его на ошибках.',
    topics: [
      agentFoundationsTopic,
      agentBuildTopic,
      agentTestingTopic,
      workflowTopic,
    ],
  },
]
export const courseModules: readonly TopicMeta[] = courseSections.flatMap(
  (section) => section.topics,
)
export const courseHours: number = courseModules.reduce(
  (sum, topic) => sum + topic.hours,
  0,
)
export const courseLessonCount: number = courseModules.reduce(
  (sum, topic) => sum + topic.lessons.length,
  0,
)
