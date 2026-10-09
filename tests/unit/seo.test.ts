import { describe, expect, test } from 'vitest'
import { canonicalUrl } from '../../app/components/seo/site'
import { serializeJsonLd } from '../../app/components/seo/JsonLd/helpers'
import type { SchemaType } from '../../app/components/seo/JsonLd/types'

describe('canonicalUrl', () => {
  test.each([
    ['/', 'https://xn-----xlcagzggchu2h.xn--p1ai/'],
    ['/blog/?ref=test#article', 'https://xn-----xlcagzggchu2h.xn--p1ai/blog'],
    ['/blog///', 'https://xn-----xlcagzggchu2h.xn--p1ai/blog'],
    [
      'https://xn-----xlcagzggchu2h.xn--p1ai/solutions?ref=test',
      'https://xn-----xlcagzggchu2h.xn--p1ai/solutions',
    ],
  ])('normalizes %s', (path: string, expected: string) => {
    expect(canonicalUrl(path)).toBe(expected)
  })

  test.each(['https://other.example/article', '//other.example/article'])(
    'rejects foreign origin %s',
    (path: string) => {
      expect(() => canonicalUrl(path)).toThrow(
        'Canonical pages must belong to the configured site origin',
      )
    },
  )
})

describe('serializeJsonLd', () => {
  test.each([
    '</script><script>alert(1)</script><!--',
    '<!-- & "quotes"',
    'Unicode: café — 日本語',
  ])('safely round-trips %s', (name: string) => {
    const data: SchemaType = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name,
    }
    const serialized: string = serializeJsonLd(data)
    expect(serialized).not.toContain('<')
    expect(JSON.parse(serialized)).toEqual(data)
  })
})
