
export function formatRankValueList(value: any[]) {
  const [ first, ...nextMatch ] = value
  const rest = nextMatch.length % 4 
  if(rest) nextMatch.push(...new Array(rest).fill(0))
  const newMatch = [
    first,
    ...nextMatch.reduce((acc, cur) => {
      const length = acc.length 
      if(length === 0 || acc[length - 1].length === 4) {
        acc.push([
          cur
        ])
      }else {
        acc[length - 1].push(cur)
      }
      return acc 
    }, [])
  ].filter(item => !!item)
  return newMatch
}