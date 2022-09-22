import React from 'react'

export function AppState ({ error, data, children }: { error?, data?, children? }) {
  if (error) {
    return <div>{error}</div>
  }
  if (!data) {
    return <div>...loading</div>
  }
  return children
}
