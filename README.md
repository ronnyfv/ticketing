# ticketing

- Install docker
- Install kubernetes
- Install kind
- Install skaffold https://skaffold.dev/docs/install/
- Create `127.0.0.1 ticketing.dev` in hosts file

- `kind create cluster --config=./infra/kind.yaml --name=ticketing`
- `kubectl cluster-info --context kind-ticketing`
- `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/kind/deploy.yaml`
- `kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=90s`

- Access `https://ticketing.dev`
