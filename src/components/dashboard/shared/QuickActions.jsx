const QuickActions = ({ actions, title = "Quick Actions" }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`p-4 ${action.bgColor} rounded-lg ${action.textColor} hover:opacity-90 transition text-center`}
          >
            <div className="text-2xl mb-2">{action.icon}</div>
            <p className="text-sm font-medium">{action.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;