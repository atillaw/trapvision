type Favorite = { id: string; name: string }
type Plan = { id: string; input: any; result: any }

const favoritesByUser = new Map<string, Favorite[]>()
const plansByUser = new Map<string, Plan[]>()

export function addFavorite(userId: string, fav: Favorite) {
  const list = favoritesByUser.get(userId) || []
  if (!list.find(f => f.id === fav.id)) list.push(fav)
  favoritesByUser.set(userId, list)
  return list
}

export function listFavorites(userId: string) {
  return favoritesByUser.get(userId) || []
}

export function savePlan(userId: string, plan: Plan) {
  const list = plansByUser.get(userId) || []
  list.push(plan)
  plansByUser.set(userId, list)
  return plan
}

export function listPlans(userId: string) {
  return plansByUser.get(userId) || []
}

