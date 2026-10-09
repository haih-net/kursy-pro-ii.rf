import type * as React from 'react'
import { levelOrder, type LevelId } from '../catalog'
import { LevelBand } from '../LevelBand'
interface TopicPart {
  readonly title: string
  readonly paragraphs: readonly string[]
}
interface TopicOutlineProps {
  readonly lessons: readonly string[]
  readonly parts: Partial<Record<LevelId, TopicPart>>
}
export const TopicOutline: React.FC<TopicOutlineProps> = ({
  parts,
  lessons,
}) => (
  <div className="topic-outline topic-levels">
    {levelOrder.map((level) => {
      const part = parts[level]
      return part ? (
        <LevelBand key={level} level={level}>
          <h4>{part.title}</h4>
          {level === levelOrder.find((id) => parts[id]) && (
            <div className="topic-lessons">
              <p>
                <strong>План занятий по всей теме · каждое по 2 часа</strong>
              </p>
              <ol>
                {lessons.map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ol>
            </div>
          )}
          {part.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </LevelBand>
      ) : null
    })}
  </div>
)
