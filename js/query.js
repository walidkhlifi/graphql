export let xpsLevel=`query {
    xp: transaction_aggregate(
      where: {
        type: { _eq: "xp" }
        eventId: { _eq: 41 }
      }
    ) { aggregate { sum { amount } } }
    level: transaction(
      limit: 1
      order_by: { amount: desc }
      where: {
        type: { _eq: "level" }
        eventId: { _eq: 41 }
      }
    ) { amount }
  }`

export let img=`
   query {
            user {
                avatarUrl
            }
        }
    `
export let info=`
        query {
            user {
                id
                login
                auditRatio
                attrs
            }
        }
    `

export let skills=` {
    user {
      transactions (
        order_by: [{ type: desc }, { amount: desc }]
        distinct_on: [type]
        where: {  type: { _like: "skill_%" } },
      )
      { type, amount }
    }
  }`

export let GetUser=`query GetUser($user_id: Int) {
            user(where: { id: { _eq: $user_id } }) {
              id
              transactions(
                order_by: [{createdAt: asc}],
                where: {userId: {_eq: $user_id} }
              ) {
                id    type    amount    objectId    createdAt     path
              }
            }
          }`

export let GetIds=`{
                object(
                where :{type : {_in : ["project", "piscine"]}}) {
                id
                name
                type
                }
            }`