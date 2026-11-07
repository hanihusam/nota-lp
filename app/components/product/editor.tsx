import {Icon} from '~/components/ui/icon'
import {Button, Popover, Toggle} from '~/lib/stageshow'

import {FillerCard, LineItems, StatusBadge, type Status} from './parts'

export interface EditorScene {
  /** The Frontend build block has been dropped in. */
  added: boolean
  /** The send dialog is open. */
  dialog: boolean
  ask: boolean
  notify: boolean
  /** The dialog's Send proposal has been pressed. */
  sent: boolean
  /** Sarah opened the link. */
  opened: boolean
}

export const EDITOR_START: EditorScene = {
  added: false,
  dialog: false,
  ask: false,
  notify: false,
  sent: false,
  opened: false,
}

interface EditorWindowProps {
  s: EditorScene
  status?: Status
}

/**
 * Figma: How it works → Window / 01 Write (688 × 640). The app's compact
 * header over the proposal: who it's for, the line items, and payment terms
 * as filler under the stage's fade.
 */
export const EditorWindow = ({s, status = s.sent ? 'sent' : 'draft'}: EditorWindowProps) => (
  <div className="pui-editor">
    <div className="pui-editor__header">
      <span className="pui-wordmark">nota</span>
      <span className="pui-app__rule" />
      <span className="pui-editor__title">Website Redesign</span>
      <StatusBadge status={status} />
      <span className="pui-editor__spacer" />
      <Button className="pui-btn">Preview</Button>
      <Button variant="primary" className="pui-btn">
        Send
      </Button>
    </div>
    <div className="pui-editor__body">
      <div className="pui-editor__client">
        <span className="pui-caption">Proposal for</span>
        <span className="pui-serif">Sarah Mitchell</span>
      </div>
      <LineItems added={s.added} />
      <FillerCard title="Payment terms" widths={[360, 300, 330]} />
    </div>
  </div>
)

EditorWindow.displayName = 'EditorWindow'

interface SendDialogProps {
  s: EditorScene
  compact?: boolean
  className?: string
  style?: React.CSSProperties
}

/**
 * Figma: How it works / Step panels → 02 Send it → Send proposal. Opens
 * pre-filled (the client's address, a message), so the beat is the two
 * switches and the press. Compact drops the message and the link line.
 */
export const SendDialog = ({s, compact, className, style}: SendDialogProps) => (
  <Popover show={s.dialog} origin="top right" className={`pui-dialog ${className ?? ''}`} style={style}>
    <div className="pui-dialog__head">
      <span>Send proposal</span>
      <Icon name="x-mark" size={14} className="pui-icon" />
    </div>
    <div className="pui-dialog__box pui-dialog__to">
      To
      <span className="pui-chip">
        <span className="pui-avatar">S</span>
        Sarah Mitchell
        {compact ? null : <span className="pui-chip__faint">sarah@mitchell.design</span>}
      </span>
    </div>
    {compact ? null : (
      <div className="pui-dialog__box pui-dialog__message">
        Hi Sarah, here is the proposal for the website redesign. You can review it and sign
        online.
      </div>
    )}
    <div className="pui-dialog__toggles">
      <span className="pui-dialog__toggle">
        Ask for a signature <Toggle on={s.ask} />
      </span>
      <span className="pui-dialog__toggle">
        Tell me when it’s opened <Toggle on={s.notify} />
      </span>
    </div>
    <div className="pui-dialog__foot">
      {compact ? null : (
        <span className="pui-dialog__link">
          <Icon name="link" size={14} className="pui-icon" />
          nota.app/p/website-redesign
        </span>
      )}
      <Button
        variant="primary"
        className="pui-btn"
        data-target="send-proposal"
        style={compact ? {flex: 1, justifyContent: 'center'} : undefined}
        icon={s.sent ? <Icon name="check" size={14} /> : undefined}
      >
        {s.sent ? 'Sent' : 'Send proposal'}
      </Button>
    </div>
  </Popover>
)

SendDialog.displayName = 'SendDialog'
