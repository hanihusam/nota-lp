import {Icon} from '~/components/ui/icon'
import {useElementSize} from '~/lib/use-element-size'
import {Bar, Stage, type Act} from '~/lib/stageshow'

// The client field types "Ali", Ali Rahman is picked, and the details the
// proposal needs arrive in the satellite one by one: the pick causes them.
type Scene = {query: string; picked: boolean; filled: number}

const QUERY = 'Ali'
const BEFORE: Scene = {query: '', picked: false, filled: 0}
const AFTER: Scene = {query: QUERY, picked: true, filled: 3}

const script = async (a: Act<Scene>) => {
  await a.wait(500)
  await a.type('query', QUERY, {interval: 90})
  await a.wait(450)
  await a.set({picked: true})
  for (const n of [1, 2, 3]) {
    await a.wait(n === 1 ? 350 : 160)
    await a.set({filled: n})
  }
}

const DETAILS = [
  {label: 'Email', value: 'ali@rahman.studio'},
  {label: 'Rate', value: '$95 / hour'},
  {label: 'Terms', value: 'Net 14'},
] as const

/** Figma: Landing → Features → Bento Tile / Client auto-fill. */
export const ClientPicture = () => {
  const [ref, {width, height}] = useElementSize<HTMLDivElement>({width: 372, height: 300})
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
          <div className="bento-client">
            <div className="bento-card bento-client__card">
              <div className="bento-client__field">
                <span className="bento-client__label">Client</span>
                <span className="bento-palette__query">
                  {s.query}
                  <span className="bento-palette__caret" />
                </span>
              </div>
              <div className="bento-palette__list">
                <div className="bento-client__row" data-selected={s.picked || undefined} data-dim={!s.query || undefined}>
                  <span className="bento-client__avatar" data-tone="accent">AR</span>
                  <span>
                    <span className="bento-client__name">Ali Rahman</span>
                    <span className="bento-client__org">Rahman Studio</span>
                  </span>
                </div>
                <div className="bento-client__row" data-dim={!s.query || undefined}>
                  <span className="bento-client__avatar">AG</span>
                  <span>
                    <span className="bento-client__name">Alicia Gomez</span>
                    <span className="bento-client__org">Gomez &amp; Co.</span>
                  </span>
                </div>
                {[96, 120].map(w => (
                  <div key={w} className="bento-client__row">
                    <span className="bento-client__avatar" />
                    <Bar w={w} h={7} tone={2} />
                  </div>
                ))}
              </div>
            </div>
            <div className="bento-client__filled" data-show={s.filled > 0 || undefined}>
              {DETAILS.map((d, i) => (
                <span key={d.label} className="bento-client__detail" data-on={s.filled > i || undefined}>
                  <Icon name="check" size={12} className="text-sage-400" />
                  <span className="text-text-tertiary">{d.label}</span>
                  <span className="text-text-primary">{d.value}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </Stage>
    </div>
  )
}

ClientPicture.displayName = 'ClientPicture'
