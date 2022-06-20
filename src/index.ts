import { getCurrentContainerId } from './functions'
import * as Dockerode from 'dockerode'

const Docker = require('dockerode')

const docker: Dockerode = new Docker({ socketPath: '/var/run/docker.sock' })

async function main(): Promise<void> | never {
    // Current Docker container ID
    const CURENT_CONTAINER_ID: string | false = await getCurrentContainerId()
    if (CURENT_CONTAINER_ID === false) {
        console.error(
            'Could not get current container ID ! Are you running in a container ?'
        )
        process.exit(1)
    }

    console.log('Current container ID:', CURENT_CONTAINER_ID)
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })
/*
docker.listContainers().then((containers: Dockerode.ContainerInfo[]) => {
    containers.forEach(async (container: Dockerode.ContainerInfo) => {
        console.log(container.Names[0])
        container.Ports.forEach((port: Dockerode.Port) => {
            console.log(
                `${port.PrivatePort} => ${port.IP}:${port.PublicPort} (${port.Type})`
            )
        })
        container.Mounts.forEach((mount) => {
            console.log(`${mount.Source}:${mount.Destination}`)
        })
    })
})
*/
