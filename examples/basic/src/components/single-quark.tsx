import { quark } from '@pasteltones/quark'

const useName = quark('John')

function Name() {
  const [name, setName] = useName()
  return <input type='text' value={name} onChange={e => setName(e.target.value)} />
}

const useProfile = quark({ name: 'Gildong', age: 20, skills: ['React', 'TypeScript'] })

function Profile() {
  const [profile, setProfile] = useProfile()
  return (
    <input type='text' value={profile.name} onChange={e => setProfile({ name: e.target.value })} />
  )
}

export function SingleQuark() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Name />
      <Profile />
    </div>
  )
}
