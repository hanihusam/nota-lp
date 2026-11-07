import {Icon} from '~/components/ui/icon'
import {Button, States} from '~/lib/stageshow'

import {LineItems, StatusBadge, type Status} from './parts'

const OTHERS: {name: string; client: string; status: Status}[] = [
  {name: 'Brand Identity Package', client: 'Alex Turner', status: 'sent'},
  {name: 'E-Commerce Platform', client: 'Jordan Lee', status: 'paid'},
  {name: 'Mobile App UI', client: 'Emily Chen', status: 'paid'},
  {name: 'Dashboard Analytics', client: 'Marcus Webb', status: 'sent'},
  {name: 'Landing Page Design', client: 'Olivia Park', status: 'draft'},
]

const META = [
  {icon: 'hashtag', label: 'Proposal', value: 'PRO-2026-041'},
  {icon: 'calendar', label: 'Date', value: 'Mar 8, 2026'},
  {icon: 'calendar', label: 'Valid until', value: 'Apr 8, 2026'},
] as const

interface AppWindowProps {
  /** The header's Send has been pressed. */
  sent: boolean
  status: Status
}

/**
 * Figma: Landing → Hero → Product Window (1152 wide). The whole app at
 * realistic fidelity: header, proposals sidebar and the editor. The story
 * only touches the Send button and the selected proposal's status.
 */
export const AppWindow = ({sent, status}: AppWindowProps) => (
  <div className="pui-app">
    <div className="pui-app__header">
      <div className="pui-app__lead">
        <span className="pui-wordmark">nota</span>
        <span className="pui-app__tabs">
          <span className="pui-app__tab" data-active>
            Proposals
          </span>
          <span className="pui-app__tab">Clients</span>
        </span>
        <span className="pui-app__rule" />
        <span className="pui-app__crumb">
          Website Redesign <StatusBadge status={status} />
        </span>
      </div>
      <div className="pui-app__actions">
        <Button className="pui-btn" icon={<Icon name="eye" size={14} />}>
          Preview
        </Button>
        <Button className="pui-btn" icon={<Icon name="document-arrow-down" size={14} />}>
          Export PDF
        </Button>
        <Button
          variant="primary"
          className="pui-btn"
          data-target="send"
          icon={
            <States
              value={sent ? 'sent' : 'send'}
              states={{
                send: <Icon name="paper-airplane" size={14} />,
                sent: <Icon name="check" size={14} />,
              }}
            />
          }
        >
          {sent ? 'Sent' : 'Send'}
        </Button>
        <span className="pui-app__me">
          <span className="pui-avatar size-7">JD</span>
          <Icon name="chevron-down" size={14} />
        </span>
      </div>
    </div>

    <div className="pui-app__body">
      <div className="pui-app__side">
        <span className="pui-search">
          <Icon name="magnifying-glass" size={14} />
          Search proposals…
        </span>
        <Button variant="primary" className="pui-btn" icon={<Icon name="plus" size={14} />}>
          New Proposal
        </Button>
        <div className="pui-app__list">
          <span className="pui-caption">Proposals</span>
          <div className="pui-app__item" data-active>
            <Icon name="document-text" size={14} className="pui-icon" />
            <span className="pui-app__item-name">Website Redesign</span>
            <span className="pui-app__item-client">Sarah Mitchell</span>
            <StatusBadge status={status} size="sm" />
          </div>
          {OTHERS.map(p => (
            <div key={p.name} className="pui-app__item">
              <Icon name="document-text" size={14} className="pui-icon" />
              <span className="pui-app__item-name">{p.name}</span>
              <span className="pui-app__item-client">{p.client}</span>
              <StatusBadge status={p.status} size="sm" />
            </div>
          ))}
        </div>
      </div>

      <div className="pui-app__main">
        <div className="pui-card pui-app__client">
          <span className="pui-caption">Proposal for</span>
          <span className="pui-serif pui-app__name">Sarah Mitchell</span>
          <span className="pui-app__email">mitchell.design@email.com</span>
          <div className="pui-app__meta">
            {META.map(m => (
              <div key={m.label}>
                <Icon name={m.icon} size={14} className="pui-icon" />
                <span>
                  <span className="pui-app__meta-label">{m.label}</span>
                  <span className="pui-app__meta-value">{m.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="pui-card pui-app__project">
          <div className="pui-app__project-head">
            <span className="pui-caption">Project</span>
            <span className="pui-app__edit">
              <Icon name="pencil" size={12} /> Edit
            </span>
          </div>
          <span className="pui-serif pui-app__project-title">Website Redesign</span>
          <span className="pui-app__email">
            Complete redesign of the existing marketing website, including new visual identity
            implementation, improved user experience, and responsive frontend development.
          </span>
        </div>
        <LineItems added />
      </div>
    </div>
  </div>
)

AppWindow.displayName = 'AppWindow'
