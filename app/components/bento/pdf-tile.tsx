import {Icon} from '~/components/ui/icon'

/**
 * Figma: Landing → Features → Bento Tile / Branded PDF. A tilted stack of paper
 * (Stageshow's one place where tilt earns its keep): the exported proposal
 * on top, a second sheet behind it, and the file chip straddling the stack.
 * A still; when the tile is revealed the sheets fan out from square and the
 * chip arrives last.
 */
export const PdfPicture = () => (
  <div className="bento-pdf" aria-hidden>
    <div className="bento-pdf__sheet bento-pdf__sheet--back" />
    <div className="bento-pdf__sheet bento-pdf__sheet--front">
      <span className="bento-pdf__studio">Jordan Doe Studio</span>
      <span className="bento-pdf__title">Proposal</span>
      <span className="bento-pdf__for">Website Redesign · for Sarah Mitchell</span>
      <span className="bento-pdf__rule" />
      {[
        [124, 34],
        [92, 30],
      ].map(([a, b]) => (
        <span key={a} className="bento-pdf__line">
          <span style={{width: a}} />
          <span style={{width: b}} />
        </span>
      ))}
      <span className="bento-pdf__rule" />
      <span className="bento-pdf__total">
        <span>Total</span>
        <span className="bento-pdf__amount">$8,569.00</span>
      </span>
    </div>
    <div className="bento-pdf__chip">
      <span className="bento-pdf__chip-icon">
        <Icon name="document-text" size={14} />
      </span>
      <span>
        <span className="block text-text-primary">Website-Redesign.pdf</span>
        <span className="block text-caption text-text-tertiary">214 KB · A4</span>
      </span>
    </div>
  </div>
)

PdfPicture.displayName = 'PdfPicture'
