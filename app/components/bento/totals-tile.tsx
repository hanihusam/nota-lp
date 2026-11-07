import {useElementSize} from '~/lib/use-element-size'
import {Bar, Collapse, Count, Stage, type Act} from '~/lib/stageshow'

// One beat: "Frontend build" opens into the list, the rows under it move
// with it, and the total rolls a beat later — the edit causes the change.
type Scene = {added: boolean; total: number}

const BEFORE: Scene = {added: false, total: 4389}
const AFTER: Scene = {added: true, total: 8569}

const currency = (n: number) =>
  `$${n.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`

const script = async (a: Act<Scene>) => {
  await a.wait(700)
  await a.set({added: true})
  await a.wait(450)
  await a.set({total: AFTER.total})
}

const Row = ({service, hours, amount, fresh}: {service: string; hours: string; amount: string; fresh?: boolean}) => (
  <div className="bento-row" data-fresh={fresh || undefined}>
    <span>{service}</span>
    <span className="bento-row__num" data-wide>{hours}</span>
    <span className="bento-row__num" data-wide>$95</span>
    <span className="bento-row__num">{amount}</span>
  </div>
)

const Filler = ({w}: {w: number}) => (
  <div className="bento-row bento-row--filler">
    <Bar w={w} h={7} tone={2} />
    <Bar w={22} h={7} tone={2} data-wide />
    <Bar w={28} h={7} tone={2} data-wide />
    <Bar w={44} h={7} tone={2} />
  </div>
)

export const TotalsPicture = () => {
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
          <div className="ss-host bento-totals" data-narrow={width < 520 || undefined}>
            <div className="bento-card">
              <div className="bento-row bento-row--head">
                <span>Service</span>
                <span className="bento-row__num" data-wide>Hours</span>
                <span className="bento-row__num" data-wide>Rate</span>
                <span className="bento-row__num">Amount</span>
              </div>
              <Row service="Discovery & research" hours="12" amount="$1,140" />
              <Row service="UI design" hours="30" amount="$2,850" />
              <Collapse open={s.added}>
                <Row service="Frontend build" hours="40" amount="$3,800" fresh />
              </Collapse>
              {[140, 110, 160, 124, 150].map((w, i) => (
                <Filler key={i} w={w} />
              ))}
            </div>
            <div className="bento-total">
              <span className="bento-total__label">Total incl. 10% tax</span>
              <Count value={s.total} format={currency} duration={800} className="bento-total__amount" />
            </div>
          </div>
        )}
      </Stage>
    </div>
  )
}

TotalsPicture.displayName = 'TotalsPicture'
