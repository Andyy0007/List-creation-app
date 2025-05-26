export default function ListItem({ item, onMove, direction }) {
  return (
    <div className="item-card">
      <div>
        <p className="item-title">{item.name}</p>
        <p className="item-subtitle">{item.species}</p>
      </div>
      {onMove && (
        <button onClick={() => onMove(item)} style={{ background: 'none', border: 'none' }}>
          <img
            src={`https://assets.ccbp.in/frontend/react-js/${direction}-arrow-img.png`}
            alt={`${direction} arrow`}
            style={{ width: '20px' }}
          />
        </button>
      )}
    </div>
  )
}
