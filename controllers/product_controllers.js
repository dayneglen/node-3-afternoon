module.exports = {
    create(req, res) {
        const db = req.app.get('db');
        const { name, description, price, image_url } = req.body;
        console.log(req.body)

        db.create_product({name, description, price, image_url})
        .then((products) => res.status(200).send(products))
        .catch(err => {
            res.status(500).send({errorMessage: 'Oops! Something went wrong! We will be right on that'});
            console.log(err);
        });
    },
    getOne(req, res) {
        const db = req.app.get('db');
        const { id } = req.params;

        db.read_product(id)
        .then(product => res.status(200).send(product))
        .catch(err => {
            res.status(500).send({errorMessage: 'Oops! Something went wrong. Could not retrieve your product!'});
            console.log(err);
        });
    },
    getAll(req, res) {
        const db = req.app.get('db');

        db.read_products()
        .then(products => res.status(200).send(products))
        .catch(err => {
            res.status(500).send({errorMessage: 'Oops... Where did your products go? I wonder...'});
            console.log(err);
        })
    },
    update(req, res) {
        const { id } = req.params;
        const { desc } = req.query;
        const db = req.app.get('db');

        db.update_product([id, desc])
        .then((product) => res.status(200).send(product))
        .catch(err => {
            res.status(500).send({errorMessage: 'Whoops, something broke. Oh well I guess'});
            console.log(err);
        });
    },
    delete(req, res) {
        const db = req.app.get('db');
        const { id } = req.params;

        db.delete_product(id)
        .then((products) => res.status(200).send(products))
        .catch(err => {
            res.status(500).send({errorMessage: 'Looks like the system did not really want your deleting that product. We will loook into that'});
            console.log(err);
        })
    }
}