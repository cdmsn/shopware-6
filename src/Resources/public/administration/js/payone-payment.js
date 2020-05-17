(this.webpackJsonp=this.webpackJsonp||[]).push([["payone-payment"],{DMdC:function(e,t,n){},KBQv:function(e,t){const{Application:n}=Shopware,a=Shopware.Classes.ApiService;class s extends a{constructor(e,t,n="payone"){super(e,t,n)}capturePayment(e){const t=`_action/${this.getApiBasePath()}/capture-payment`;return this.httpClient.post(t,{transaction:e},{headers:this.getBasicHeaders()}).then(e=>a.handleResponse(e))}refundPayment(e){const t=`_action/${this.getApiBasePath()}/refund-payment`;return this.httpClient.post(t,{transaction:e},{headers:this.getBasicHeaders()}).then(e=>a.handleResponse(e))}}n.addServiceProvider("PayonePaymentService",e=>{const t=n.getContainer("init");return new s(t.httpClient,e.loginService)})},Lvox:function(e,t,n){var a=n("DMdC");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,n("SZ7m").default)("3806acf0",a,!0,{})},McCE:function(e,t,n){var a=n("McMq");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,n("SZ7m").default)("f06f327e",a,!0,{})},McMq:function(e,t,n){},NXBA:function(e,t,n){},OPxs:function(e,t,n){"use strict";n.r(t);var a=n("mLM4"),s=n.n(a);n("McCE");const{Component:i,Mixin:o}=Shopware;i.register("payone-settings",{template:s.a,mixins:[o.getByName("notification"),o.getByName("sw-inline-snippet")],inject:["PayonePaymentSettingsService"],data:()=>({isLoading:!1,isTesting:!1,isSaveSuccessful:!1,isTestSuccessful:!1,config:{},merchantIdFilled:!1,accountIdFilled:!1,portalIdFilled:!1,portalKeyFilled:!1,showValidationErrors:!1,isSupportModalOpen:!1,stateMachineTransitionActions:[],collapsibleState:{status_mapping:!0,payment_credit_card:!0,payment_paypal:!0,payment_paypal_express:!0,payment_debit:!0,payment_sofort:!0,payment_payolution_installment:!0,payment_payolution_invoicing:!0,payment_payolution_debit:!0}}),created(){this.createdComponent()},computed:{credentialsMissing:function(){return!(this.merchantIdFilled&&this.accountIdFilled&&this.portalIdFilled&&this.portalKeyFilled)}},metaInfo(){return{title:this.$createTitle()}},methods:{createdComponent(){let e=this;this.PayonePaymentSettingsService.getStateMachineTransitionActions().then(t=>{t.data.forEach(t=>{e.stateMachineTransitionActions.push({label:e.$tc("payone-payment.transitionActionNames."+t.label),value:t.value})})})},paymentMethodPrefixes:()=>["creditCard","debit","paypal","paypalExpress","payolutionInvoicing","payolutionInstallment","payolutionDebit","sofort"],isCollapsible(e){return e.name in this.collapsibleState},displayField(e,t,n){return!(n.name in this.collapsibleState)||!this.collapsibleState[n.name]},isCollapsed(e){return this.collapsibleState[e.name]},toggleCollapsible(e){e.name in this.collapsibleState&&(this.collapsibleState[e.name]=!this.collapsibleState[e.name])},saveFinish(){this.isSaveSuccessful=!1},testFinish(){this.isTestSuccessful=!1},onConfigChange(e){this.config=e,this.checkCredentialsFilled(),this.showValidationErrors=!1},checkCredentialsFilled(){this.merchantIdFilled=!!this.getConfigValue("merchantId"),this.accountIdFilled=!!this.getConfigValue("accountId"),this.portalIdFilled=!!this.getConfigValue("portalId"),this.portalKeyFilled=!!this.getConfigValue("portalKey")},getConfigValue(e){const t=this.$refs.systemConfig.actualConfigData.null;return null===this.$refs.systemConfig.currentSalesChannelId?this.config[`PayonePayment.settings.${e}`]:this.config[`PayonePayment.settings.${e}`]||t[`PayonePayment.settings.${e}`]},getPaymentConfigValue(e,t){let n=e.charAt(0).toUpperCase()+e.slice(1);return this.getConfigValue(t+n)||this.getConfigValue(e)},onSave(){this.credentialsMissing?this.showValidationErrors=!0:(this.isSaveSuccessful=!1,this.isLoading=!0,this.$refs.systemConfig.saveAll().then(()=>{this.isLoading=!1,this.isSaveSuccessful=!0}).catch(()=>{this.isLoading=!1}))},onTest(){this.isTesting=!0,this.isTestSuccessful=!1;let e={};this.paymentMethodPrefixes().forEach(t=>{e[t]={merchantId:this.getPaymentConfigValue("merchantId",t),accountId:this.getPaymentConfigValue("accountId",t),portalId:this.getPaymentConfigValue("portalId",t),portalKey:this.getPaymentConfigValue("portalKey",t)}}),this.PayonePaymentSettingsService.validateApiCredentials(e).then(e=>{const t=e.testCount,n=e.credentialsValid,a=e.errors;if(n)this.createNotificationSuccess({title:this.$tc("payone-payment.settingsForm.titleSuccess"),message:t>0?this.$tc("payone-payment.settingsForm.messageTestSuccess"):this.$tc("payone-payment.settingsForm.messageTestNoTestedPayments")}),this.isTestSuccessful=!0;else for(let e in a)a.hasOwnProperty(e)&&this.createNotificationError({title:this.$tc("payone-payment.settingsForm.titleError"),message:this.$tc("payone-payment.settingsForm.messageTestError."+e)});this.isTesting=!1}).catch(e=>{this.createNotificationError({title:this.$tc("payone-payment.settingsForm.titleError"),message:this.$tc("payone-payment.settingsForm.messageTestError.general")}),this.isTesting=!1})},getBind(e,t){return t!==this.config&&this.onConfigChange(t),this.showValidationErrors&&("PayonePayment.settings.merchantId"!==e.name||this.merchantIdFilled||(e.config.error={code:1,detail:this.$tc("payone-payment.messageNotBlank")}),"PayonePayment.settings.accountId"!==e.name||this.accountIdFilled||(e.config.error={code:1,detail:this.$tc("payone-payment.messageNotBlank")}),"PayonePayment.settings.portalId"!==e.name||this.portalIdFilled||(e.config.error={code:1,detail:this.$tc("payone-payment.messageNotBlank")}),"PayonePayment.settings.portalKey"!==e.name||this.portalKeyFilled||(e.config.error={code:1,detail:this.$tc("payone-payment.messageNotBlank")})),e}}});var r=n("jAFz"),l=n.n(r);n("Lvox");const{Component:c,Mixin:p}=Shopware;c.override("sw-order-detail-base",{template:l.a,inject:["PayonePaymentService"],mixins:[p.getByName("notification")],data:()=>({disableButtons:!1}),methods:{isPayonePayment:e=>!!e.customFields&&e.customFields.payone_transaction_id,isCapturePossible(e){return!!e.customFields&&(!this.disableButtons&&e.customFields.payone_allow_capture)},isRefundPossible(e){return!!e.customFields&&(!this.disableButtons&&e.customFields.payone_allow_refund)},hasPayonePayment(e){let t=this,n=!1;return!!e.transactions&&(e.transactions.map((function(e){t.isPayonePayment(e)&&(n=!0)})),n)},captureOrder(e){let t=this;this.isPayonePayment(e)&&(t.disableButtons=!0,this.PayonePaymentService.capturePayment(e.id).then(()=>{this.createNotificationSuccess({title:this.$tc("payone-payment.capture.successTitle"),message:this.$tc("payone-payment.capture.successMessage")}),t.reloadEntityData(),t.disableButtons=!1}).catch(e=>{this.createNotificationError({title:this.$tc("payone-payment.capture.errorTitle"),message:e.response.data.message}),t.disableButtons=!1}))},refundOrder(e){let t=this;this.isPayonePayment(e)&&(t.disableButtons=!0,this.PayonePaymentService.refundPayment(e.id).then(()=>{this.createNotificationSuccess({title:this.$tc("payone-payment.refund.successTitle"),message:this.$tc("payone-payment.refund.successMessage")}),t.reloadEntityData(),t.disableButtons=!1}).catch(e=>{this.createNotificationError({title:this.$tc("payone-payment.refund.errorTitle"),message:e.response.data.message}),t.disableButtons=!1}))}}});var d=n("Yjca"),u=n.n(d);n("d11z");const{Component:m}=Shopware;m.override("sw-settings-index",{template:u.a});var y=n("m1C4"),h=n("eQpg");const{Module:g}=Shopware;g.register("payone-payment",{type:"plugin",name:"PayonePayment",title:"payone-payment.general.mainMenuItemGeneral",description:"payone-payment.general.descriptionTextModule",version:"1.0.0",targetVersion:"1.0.0",icon:"default-action-settings",snippets:{"de-DE":y,"en-GB":h},routeMiddleware(e,t){e(t)},routes:{index:{component:"payone-settings",path:"index",meta:{parentPath:"sw.settings.index"}}}});n("KBQv"),n("Q7qL")},Q7qL:function(e,t){const{Application:n}=Shopware,a=Shopware.Classes.ApiService;class s extends a{constructor(e,t,n="payone_payment"){super(e,t,n)}validateApiCredentials(e){const t=this.getBasicHeaders();return this.httpClient.post(`_action/${this.getApiBasePath()}/validate-api-credentials`,{credentials:e},{headers:t}).then(e=>a.handleResponse(e))}getStateMachineTransitionActions(){const e=this.getBasicHeaders();return this.httpClient.get(`_action/${this.getApiBasePath()}/get-state-machine-transition-actions`,{headers:e}).then(e=>a.handleResponse(e))}}n.addServiceProvider("PayonePaymentSettingsService",e=>{const t=n.getContainer("init");return new s(t.httpClient,e.loginService)})},Yjca:function(e,t){e.exports='{% block sw_settings_content_card_slot_plugins %}\n    {% parent %}\n\n    <sw-settings-item :label="$tc(\'payone-payment.general.mainMenuItemGeneral\')"\n                      :to="{ name: \'payone.payment.index\' }"\n                      :backgroundEnabled="false">\n        <template #icon>\n            \x3c!-- TODO: Image only works in production mode --\x3e\n            <img class="sw-settings-index__payone-icon" :src="\'payonepayment/plugin.png\' | asset">\n        </template>\n    </sw-settings-item>\n{% endblock %}\n'},d11z:function(e,t,n){var a=n("NXBA");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,n("SZ7m").default)("e7715378",a,!0,{})},eQpg:function(e){e.exports=JSON.parse('{"payone-payment":{"title":"PAYONE","general":{"mainMenuItemGeneral":"PAYONE","descriptionTextModule":"Settings for PAYONE"},"capture":{"buttonTitle":"Capture","successTitle":"PAYONE","successMessage":"Capture processed successfully.","errorTitle":"PAYONE"},"refund":{"buttonTitle":"Refund","successTitle":"PAYONE","successMessage":"Refund processed successfully.","errorTitle":"PAYONE"},"settingsForm":{"save":"Save","test":"Test API Credentials","titleSuccess":"Success","titleError":"Error","messageTestSuccess":"The API credentials were verified successfully.","messageTestNoTestedPayments":"No payment methods were tested during the check because none of the PAYONE payment methods are activated. Please activate at least one PAYONE payment method under Settings --\x3e Shop --\x3e Payment.","messageTestError":{"general":"The API credentials could not be verified successfully.","creditCard":"The API credentials for Credit Card are not valid.","debit":"The API credentials for Debit are not valid.","paypalExpress":"The API credentials for PayPal Express are not valid.","paypal":"The API credentials for PayPal are not valid.","payolutionInstallment":"The API credentials for Paysafe Pay Later Installment are not valid.","payolutionInvoicing":"The API credentials for Paysafe Pay Later Invoicing are not valid.","payolutionDebit":"The API credentials for Paysafe Pay Later Debit are not valid.","sofort":"The API credentials for SOFORT are not valid."}},"supportModal":{"menuButton":"Support","title":"How Can We Help You?","documentation":{"description":"Read our online manual","button":"Online Manual"},"support":{"description":"Contact our technical support","button":"Tech Support"},"repository":{"description":"Report errors on GitHub","button":"GitHub"}},"transitionActionNames":{"cancel":"Cancel","complete":"Complete","pay":"Pay","pay_partially":"Pay partially","process":"Process","refund":"Refund","refund_partially":"Refund partially","remind":"Remind","reopen":"Reopen","retour":"Retour","retour_partially":"Retour partially","ship":"Ship","ship_partially":"Ship partially"},"messageNotBlank":"This field must not be empty.","txid":"TXID","sequenceNumber":{"label":"Sequence Number","empty":"none"},"transactionState":"State"}}')},jAFz:function(e,t){e.exports='{% block sw_order_detail_delivery_metadata %}\n    {% parent %}\n\n    <template v-if="!isLoading" :isLoading="isLoading">\n        <template v-if="hasPayonePayment(order)">\n            <sw-card class="sw-order-payone-card" :title="$tc(\'payone-payment.title\')">\n                <template v-for="transaction in order.transactions">\n                    <template v-if="isPayonePayment(transaction)">\n                        <sw-container columns="1fr 1fr">\n                            <sw-container>\n                                <sw-description-list>\n                                    <dt>{{ $tc(\'payone-payment.txid\') }}</dt>\n                                    <dd class="sw-order-base__label-sales-channel">{{ transaction.customFields.payone_transaction_id }}</dd>\n\n                                    <dt>{{ $tc(\'payone-payment.sequenceNumber.label\') }}</dt>\n                                    <dd class="sw-order-base__label-sales-channel">\n                                        <span v-if="transaction.customFields.payone_sequence_number == -1">\n                                            {{ $tc(\'payone-payment.sequenceNumber.empty\') }}\n                                        </span>\n                                        <span v-else>\n                                            {{ transaction.customFields.payone_sequence_number }}\n                                        </span>\n                                    </dd>\n\n                                    <dt>{{ $tc(\'payone-payment.transactionState\') }}</dt>\n                                    <dd class="sw-order-base__label-sales-channel">{{ transaction.customFields.payone_transaction_state }}</dd>\n                                </sw-description-list>\n                            </sw-container>\n\n                            <sw-container gap="30px">\n                                <sw-button @click="captureOrder(transaction)" :disabled="!isCapturePossible(transaction)">\n                                    {{ $tc(\'payone-payment.capture.buttonTitle\') }}\n                                </sw-button>\n\n                                <sw-button @click="refundOrder(transaction)" :disabled="!isRefundPossible(transaction)">\n                                    {{ $tc(\'payone-payment.refund.buttonTitle\') }}\n                                </sw-button>\n                            </sw-container>\n                        </sw-container>\n                    </template>\n                </template>\n            </sw-card>\n        </template>\n    </template>\n{% endblock %}\n'},m1C4:function(e){e.exports=JSON.parse('{"payone-payment":{"title":"PAYONE","general":{"mainMenuItemGeneral":"PAYONE","descriptionTextModule":"Einstellungen für PAYONE"},"capture":{"buttonTitle":"Capture","successTitle":"PAYONE","successMessage":"Capture erfolgreich durchgeführt.","errorTitle":"PAYONE"},"refund":{"buttonTitle":"Refund","successTitle":"PAYONE","successMessage":"Refund erfolgreich durchgeführt.","errorTitle":"PAYONE"},"settingsForm":{"save":"Speichern","test":"API-Zugangsdaten testen","titleSuccess":"Erfolg","titleError":"Fehler","messageTestSuccess":"Die API-Zugangsdaten wurden erfolgreich validiert.","messageTestNoTestedPayments":"Bei der Prüfung wurden keine Zahlarten getestet, weil keine der PAYONE Zahlarten aktiviert ist. Bitte aktivieren Sie mindestens eine PAYONE Zahlart unter Einstellungen --\x3e Shop --\x3e Zahlungsarten.","messageTestError":{"general":"Die API-Zugangsdaten konnten nicht validiert werden.","creditCard":"Die API-Zugangsdaten für Kreditkarte sind nicht korrekt.","debit":"Die API-Zugangsdaten für Lastschrift sind nicht korrekt.","paypalExpress":"Die API-Zugangsdaten für PayPal Express sind nicht korrekt.","paypal":"Die API-Zugangsdaten für PayPal sind nicht korrekt.","payolutionInstallment":"Die API-Zugangsdaten für Paysafe Pay Later Ratenzahlung sind nicht korrekt.","payolutionInvoicing":"Die API-Zugangsdaten für Paysafe Pay Later Rechnungskauf sind nicht korrekt.","payolutionDebit":"Die API-Zugangsdaten für Paysafe Pay Later Lastschrift sind nicht korrekt.","sofort":"Die API-Zugangsdaten für SOFORT sind nicht korrekt."}},"supportModal":{"menuButton":"Support","title":"Wie können wir Ihnen helfen?","documentation":{"description":"Lesen Sie unsere Online-Dokumentation","button":"Dokumentation"},"support":{"description":"Kontaktieren Sie unseren technischen Support","button":"Technischer Support"},"repository":{"description":"Melden Sie Fehler und Verbesserungen auf GitHub","button":"GitHub"}},"transitionActionNames":{"cancel":"Stornieren","complete":"Abschließen","pay":"Bezahlen","pay_partially":"Teilweise bezahlen","process":"Durchführen","refund":"Rückerstatten","refund_partially":"Teilweise rückerstatten","remind":"Erinnern","reopen":"Wieder öffnen","retour":"Retoure","retour_partially":"Teilweise retounieren","ship":"Versenden","ship_partially":"Teilweise versenden"},"messageNotBlank":"Dieser Wert darf nicht leer sein.","txid":"TXID","sequenceNumber":{"label":"Sequenznummer","empty":"keine"},"transactionState":"Status"}}')},mLM4:function(e,t){e.exports='{% block payone_payment %}\n<sw-page class="payone-payment">\n    {% block payone_payment_header %}\n    <template #smart-bar-header>\n        <h2>\n            {{ $tc(\'sw-settings.index.title\') }}\n            <sw-icon name="small-arrow-medium-right" small></sw-icon>\n            {{ $tc(\'payone-payment.title\') }}\n        </h2>\n    </template>\n    {% endblock %}\n\n    {% block payone_payment_actions %}\n    <template #smart-bar-actions>\n        {% block payone_payment_settings_actions_feedback %}\n        <sw-button\n                @click="isSupportModalOpen = true"\n                :disabled="false"\n                variant="ghost"\n                :square="false"\n                :block="false"\n                :isLoading="false">\n            {{ $tc(\'payone-payment.supportModal.menuButton\') }}\n        </sw-button>\n        {% endblock %}\n\n        {% block payone_payment_settings_actions_test %}\n        <sw-button-process @click="onTest"\n                           :isLoading="isTesting"\n                           :processSuccess="isTestSuccessful"\n                           :disabled="credentialsMissing || isLoading">\n            {{ $tc(\'payone-payment.settingsForm.test\') }}\n        </sw-button-process>\n        {% endblock %}\n\n        {% block payone_payment_settings_actions_save %}\n        <sw-button-process\n                class="sw-settings-login-registration__save-action"\n                :isLoading="isLoading"\n                :processSuccess="isSaveSuccessful"\n                :disabled="isLoading || isTesting"\n                variant="primary"\n                @process-finish="saveFinish"\n                @click="onSave">\n            {{ $tc(\'payone-payment.settingsForm.save\') }}\n        </sw-button-process>\n        {% endblock %}\n    </template>\n    {% endblock %}\n\n    {% block payone_payment_settings_content %}\n    <template #content>\n        <sw-modal\n                v-if="isSupportModalOpen"\n                @modal-close="isSupportModalOpen = false"\n                :title="$tc(\'payone-payment.supportModal.title\')"\n                class="payone-feedback sw-modal--large">\n            <sw-container columns="1fr 1fr 1fr">\n                <div class="payone-feedback__col">\n                    <div class="payone-feedback__icon">\n                        <sw-icon name="default-documentation-file" large="true"></sw-icon>\n                    </div>\n                    <p class="payone-feedback__desc">\n                        {{ $tc(\'payone-payment.supportModal.documentation.description\') }}\n                    </p>\n                    <sw-button\n                            :disabled="false"\n                            variant="primary"\n                            :square="false"\n                            :block="false"\n                            :isLoading="false"\n                            link="https://docs.payone.com/display/public/INT/Shopware+6+Plugin">\n                        {{ $tc(\'payone-payment.supportModal.documentation.button\') }}\n                    </sw-button>\n                </div>\n                <div class="payone-feedback__col">\n                    <div class="payone-feedback__icon">\n                        <sw-icon name="default-device-headset" large="true"></sw-icon>\n                    </div>\n                    <p class="payone-feedback__desc">\n                        {{ $tc(\'payone-payment.supportModal.support.description\') }}\n                    </p>\n                    <sw-button\n                            :disabled="false"\n                            variant="primary"\n                            :square="false"\n                            :block="false"\n                            :isLoading="false"\n                            link="mailto:tech.support@payone.com">\n                        {{ $tc(\'payone-payment.supportModal.support.button\') }}\n                    </sw-button>\n                </div>\n                <div class="payone-feedback__col">\n                    <div class="payone-feedback__icon">\n                        <sw-icon name="default-text-code" large="true"></sw-icon>\n                    </div>\n                    <p class="payone-feedback__desc">\n                        {{ $tc(\'payone-payment.supportModal.repository.description\') }}\n                    </p>\n                    <sw-button\n                            :disabled="false"\n                            variant="primary"\n                            :square="false"\n                            :block="false"\n                            :isLoading="false"\n                            link="https://github.com/PAYONE-GmbH/shopware-6">\n                        {{ $tc(\'payone-payment.supportModal.repository.button\') }}\n                    </sw-button>\n                </div>\n            </sw-container>\n        </sw-modal>\n\n        <sw-card-view>\n            <sw-system-config\n                    class="payone-config__wrapper"\n                    ref="systemConfig"\n                    salesChannelSwitchable\n                    inherit\n                    @config-changed="onConfigChange"\n                    domain="PayonePayment.settings">\n\n                <template #beforeElements="{card, config}">\n                    <div v-if="isCollapsible(card)" class="payone-config__collapsible-container" v-bind:class="{\'collapsed\': isCollapsed(card)}" >\n                        <a class="payone-config__collapsible-handle" @click="toggleCollapsible(card)">\n                            <sw-icon small v-if="isCollapsed(card)" name="small-arrow-medium-down" class="payone-config__collapsible-handle-open"></sw-icon>\n                            <sw-icon small v-if="!isCollapsed(card)" name="small-arrow-medium-up" class="payone-config__collapsible-handle-close"></sw-icon>\n                        </a>\n                    </div>\n                </template>\n\n                <template #card-element="{element, config, card}">\n                    <div v-show="displayField(element, config, card)">\n                        <sw-form-field-renderer\n                            v-if="element.name.startsWith(\'PayonePayment.settings.paymentStatus\')"\n                            :config="{\n                                componentName: \'sw-single-select\',\n                                label: getInlineSnippet(element.config.label),\n                                helpText: getInlineSnippet(element.config.helpText),\n                                options: stateMachineTransitionActions,\n                            }"\n                            v-model="config[element.name]"\n                        />\n\n                        <sw-form-field-renderer\n                            v-else\n                            v-bind="getBind(element, config)"\n                            v-model="config[element.name]"\n                        />\n                    </div>\n                </template>\n            </sw-system-config>\n        </sw-card-view>\n    </template>\n    {% endblock %}\n</sw-page>\n{% endblock %}\n'}},[["OPxs","runtime","vendors-node"]]]);
