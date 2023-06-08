export function uploadFile() {
    const cdnClient = window['@youwol/cdn-client']

    const loadingScreen = new cdnClient.LoadingScreenView()
    loadingScreen.render()
    cdnClient
        .install(
            {
                modules: [...['bootstrap#^4.4.0']],
                css: [],
            },
            {},
        )
        .then(() => {
            loadingScreen.done()
        })
}
