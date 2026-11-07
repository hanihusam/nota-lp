import {Kbd} from '~/components/ui/kbd'
import {useElementSize} from '~/lib/use-element-size'
import {Bar, Stage, type Act} from '~/lib/stageshow'

// The palette is already open; the query types itself, the matching client
// lands on the first result, and Enter presses it. No cursor: this is a
// keyboard story.
type Scene = {query: string; matched: boolean; chosen: boolean}

const QUERY = 'New proposal for Ali'
const BEFORE: Scene = {query: '', matched: false, chosen: false}
const AFTER: Scene = {query: QUERY, matched: true, chosen: false}

const script = async (a: Act<Scene>) => {
  await a.wait(600)
  await a.type('query', QUERY, {interval: 45})
  await a.set({matched: true})
  await a.wait(700)
  await a.set({chosen: true})
  await a.wait(220)
  await a.set({chosen: false})
}

const RESULTS = [
  {label: 'Duplicate last proposal', keys: ['⌘', 'D']},
  {label: 'Export as PDF', keys: ['⌘', 'E']},
  {label: 'Copy share link', keys: ['⌘', 'L']},
] as const

export const KeyboardPicture = () => {
  const [ref, {width, height}] = useElementSize<HTMLDivElement>({width: 700, height: 320})
  return (
    <div ref={ref} className="absolute inset-0">
      <Stage<Scene>
        width={width}
        height={Math.max(height, 260)}
        theme="dark"
        play="once"
        startAt={0.5}
        initial={BEFORE}
        poster={AFTER}
        script={script}
        className="nota-stage bento-stage"
      >
        {s => (
          <div className="ss-host bento-palette">
            <div className="bento-card">
              <div className="bento-palette__field">
                <span className="bento-palette__query">
                  {s.query || <span className="text-text-disabled">Type a command…</span>}
                  <span className="bento-palette__caret" />
                </span>
                <span className="flex gap-1">
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </span>
              </div>
              <div className="bento-palette__list">
                <div className="bento-palette__item" data-selected data-pressed={s.chosen || undefined}>
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="text-text-primary">Create proposal</span>
                    <span className="bento-palette__meta" data-show={s.matched || undefined}>
                      — Ali Rahman
                    </span>
                  </span>
                  <Kbd>↵</Kbd>
                </div>
                {RESULTS.map(r => (
                  <div key={r.label} className="bento-palette__item">
                    <span>{r.label}</span>
                    <span className="flex gap-1">
                      {r.keys.map(k => (
                        <Kbd key={k}>{k}</Kbd>
                      ))}
                    </span>
                  </div>
                ))}
                {[150, 118, 136].map(w => (
                  <div key={w} className="bento-palette__item bento-palette__item--filler">
                    <Bar w={w} h={7} tone={2} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Stage>
    </div>
  )
}

KeyboardPicture.displayName = 'KeyboardPicture'
