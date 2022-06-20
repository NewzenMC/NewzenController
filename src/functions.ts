import { readFile } from 'fs/promises'

export async function getCurrentContainerId(): Promise<string | false> {
    try {
        const data = await readFile('/proc/self/cgroup', 'utf8')
        const lines = data.split('\n')
        const line_with_id = lines.find((l) => l.indexOf('docker/') > -1)
        if (line_with_id) {
            return line_with_id.split('docker/').pop()
        } else {
            return false
        }
    } catch {
        return false
    }
}
