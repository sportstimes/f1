import styles from './Subscribe.module.scss'
import React from "react";

export default function Subscribe() {
    return <>
        <section className={styles.subscribe}>
            <h4>Subscribe</h4>
            <p>Receive an email reminder ahead of each race weekend.</p>
            <form
                action="https://f1calendar.us10.list-manage.com/subscribe/post?u=e11245c4d3fecdad90cb66908&amp;id=f7a8a5001f"
                method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate"
                target="_blank" noValidate>

                <div className={styles.row}>
                    <label for="mce-EMAIL">Email Address</label>
                    <input type="email" name="EMAIL" className="required email" id="mce-EMAIL"/>
                </div>

                <div className={styles.hidden}>
                    <input type="text" name="b_e11245c4d3fecdad90cb66908_f7a8a5001f" tabIndex="-1" value=""/>
                </div>

                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe"
                       className={styles.button}/>

            </form>
        </section>
    </>
}