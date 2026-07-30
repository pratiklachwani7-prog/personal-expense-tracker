const Skeleton = ({ className = "", style }) => (
  <div className={`skeleton ${className}`} style={style} aria-hidden="true" />
)

export const StatCardSkeleton = () => (
  <div className="glass-card stat-card">
    <div className="flex items-start justify-between mb-4">
      <Skeleton className="w-10 h-10 rounded-lg" />
    </div>
    <Skeleton className="h-3 w-20 mb-3" />
    <Skeleton className="h-8 w-28" />
  </div>
)

export const ExpenseCardSkeleton = () => (
  <div className="expense-card">
    <div className="flex gap-4">
      <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-3 w-2/5" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-16 ml-auto" />
        </div>
      </div>
    </div>
  </div>
)

export const ChartSkeleton = () => (
  <div className="glass-card p-6">
    <Skeleton className="h-5 w-40 mb-2" />
    <Skeleton className="h-3 w-56 mb-8" />
    <div className="flex items-center justify-center">
      <Skeleton className="w-48 h-48 rounded-full" />
    </div>
  </div>
)

export default Skeleton
