import {useEffect, useRef} from 'react'

import {ClientPage, SignCard, SIGN_START, type SignScene} from '~/components/product/client-page'
import {EDITOR_START, EditorWindow, SendDialog, type EditorScene} from '~/components/product/editor'
import {LineItems, Notice, SIGNATURE_MS} from '~/components/product/parts'
import {Stage} from '~/lib/stageshow'

import {finalState, toScript, useBeatPlayer, type Beat} from './beats'

// 01 · Write it — the Frontend build block lands and the totals roll.
const WRITE: Beat<EditorScene>[] = [{wait: 500, set: {added: true}}]

// 02 · Send it — the dialog opens pre-filled, both switches go on, Send, and
// a moment later the "opened" notice arrives.
const SEND: Beat<EditorScene>[] = [
  {wait: 150, set: {dialog: true}},
  {wait: 650, set: {ask: true}},
  {wait: 350, set: {notify: true}},
  {wait: 650, set: {sent: true}},
  {wait: 1000, set: {opened: true}},
]

// 03 · Get it signed — the client types her name, the ink draws on, she
// agrees and signs.
const SIGN: Beat<SignScene>[] = [
  {wait: 450, type: {key: 'name', text: 'Sarah Mitchell'}},
  {wait: 250, set: {drawn: true}},
  {wait: SIGNATURE_MS + 150, set: {agreed: true}},
  {wait: 550, set: {signed: true}},
]

const AFTER_WRITE = finalState(EDITOR_START, WRITE)
const AFTER_SEND = finalState(AFTER_WRITE, SEND)
const AFTER_SIGN = finalState(SIGN_START, SIGN)

const WIDE = {width: 688, height: 640} as const

/* ── Stacked: one picture per step, each its own Stage ─────────────── */

const scriptWrite = toScript(WRITE)
const scriptSend = toScript(SEND)
const scriptSign = toScript(SIGN)

/**
 * The picture for one step in the stacked layout (phones, short screens,
 * reduced motion). Plays once when half of it is in view. Below 560px each
 * step is a redesign around its payoff, not the window shrunk: the line
 * items card, the dialog, the signing card.
 */
export const StepPicture = ({step}: {step: number}) => {
  if (step === 0) {
    return (
      <Stage<EditorScene>
        {...WIDE}
        compact={{below: 560, width: 350, height: 372}}
        theme="dark"
        play="once"
        startAt={0.5}
        initial={EDITOR_START}
        poster={AFTER_WRITE}
        script={scriptWrite}
        className="nota-stage how-stage"
      >
        {(s, _rect, layout) =>
          layout === 'compact' ? (
            <LineItems added={s.added} narrow className="how-compact-card" />
          ) : (
            <EditorWindow s={s} />
          )
        }
      </Stage>
    )
  }
  if (step === 1) {
    return (
      <Stage<EditorScene>
        {...WIDE}
        compact={{below: 560, width: 350, height: 312}}
        theme="dark"
        play="once"
        startAt={0.5}
        initial={AFTER_WRITE}
        poster={AFTER_SEND}
        script={scriptSend}
        className="nota-stage how-stage"
      >
        {(s, _rect, layout) =>
          layout === 'compact' ? (
            <>
              <SendDialog s={{...s, dialog: true}} compact className="how-dialog-compact" />
              <Notice
                show={s.opened}
                title="Sarah opened your proposal"
                meta="Website Redesign · Just now"
                className="how-notice-compact"
              />
            </>
          ) : (
            <SendLayer s={s} />
          )
        }
      </Stage>
    )
  }
  return (
    <Stage<SignScene>
      {...WIDE}
      compact={{below: 560, width: 350, height: 388}}
      theme="dark"
      play="once"
      startAt={0.5}
      initial={SIGN_START}
      poster={AFTER_SIGN}
      script={scriptSign}
      className="nota-stage how-stage"
    >
      {(s, _rect, layout) =>
        layout === 'compact' ? <SignCard s={s} compact /> : <ClientPage s={s} />
      }
    </Stage>
  )
}

StepPicture.displayName = 'StepPicture'

/** The editor with the send dialog over it and the notice under it (02, wide). */
const SendLayer = ({s}: {s: EditorScene}) => (
  <>
    <EditorWindow s={s} />
    <SendDialog s={s} style={{left: 124, top: 92}} />
    <Notice
      show={s.opened}
      title="Sarah opened your proposal"
      meta="Website Redesign · Just now"
      style={{left: 396, top: 524}}
    />
  </>
)

SendLayer.displayName = 'SendLayer'

/* ── Pinned: one stage, scroll picks the step ──────────────────────── */

// useBeatPlayer drives the pinned stage, not a script. Stageshow treats a
// stage without a script as a still and turns its transitions off, so this
// empty one keeps them on (it plays once and ends at once).
const HOLD = async () => {}

interface PinnedPictureProps {
  /** The step on screen. */
  active: number
  /** The furthest step reached so far; its beats and every earlier step's have played. */
  reached: number
}

/**
 * The pinned chapter's stage (688 × 640). Steps 01 and 02 share one editor
 * window, so Send opens over the proposal just written; 03 crossfades to the
 * client's browser. Each step's beats play once, the first time it is
 * reached, and then hold, so scrolling back never rewinds the data.
 */
export const PinnedPicture = ({active, reached}: PinnedPictureProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [editor, playEditor] = useBeatPlayer(EDITOR_START)
  const [sign, playSign] = useBeatPlayer(SIGN_START)
  const played = useRef(-1)
  const seen = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const run = () => {
      while (played.current < reached) {
        played.current += 1
        if (played.current === 0) playEditor(WRITE)
        if (played.current === 1) playEditor(SEND)
        if (played.current === 2) playSign(SIGN)
      }
    }
    if (seen.current) return run()
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        seen.current = true
        observer.disconnect()
        run()
      },
      {threshold: 0.5},
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reached, playEditor, playSign])

  return (
    <div ref={ref}>
      <Stage
        {...WIDE}
        theme="dark"
        play="once"
        script={HOLD}
        className="nota-stage how-stage how-stage--pinned"
      >
        {() => (
          <>
            <div className="how-layer" data-active={active < 2 || undefined}>
              <SendLayer s={editor} />
            </div>
            <div className="how-layer" data-active={active === 2 || undefined}>
              <ClientPage s={sign} />
            </div>
          </>
        )}
      </Stage>
    </div>
  )
}

PinnedPicture.displayName = 'PinnedPicture'
