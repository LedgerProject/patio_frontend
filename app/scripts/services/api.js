'use strict';

/**
 * @ngdoc service
 * @name comunitariaApp.api
 * @description
 * # api
 * Service in the comunitariaApp.
 */
angular.module('comunitariaApp').service('api', function($resource, backend, $cacheFactory) {
	var base_url = backend + '/api';
	var energy_base_url = backend + '/energy';

	return {
		/* Entry point for bugdet categories */
		budget: $resource(
			base_url + '/bugdet/:category/',
			{},
			{
				get: {
					method: 'GET',
					isArray: false,
					cache: true
				}
			}
		),

		community: $resource(
			base_url + '/community/:community/',
			{},
			{
				get: {
					method: 'GET',
					isArray: false,
					cache: false
				}
			}
		),
		customDemo: $resource(
			base_url + '/custom_demo/?uidb64=:uuid',
			{},
			{
				get: {
					method: 'GET',
					isArray: true,
					cache: true
				}
			}
		),
		current_user: $resource(
			base_url + '/user',
			{},
			{
				get: {
					method: 'GET',
					isArray: false,
					cache: false
				}
			}
		),

		update_profile: $resource(
			base_url + '/update/profile/',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: true
				}
			}
		),
		update_password: $resource(
			base_url + '/update/password/',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: true
				}
			}
		),
		invalidateCache: function invalidateCache() {
			var $httpDefaultCache = $cacheFactory.get('$http');
			$httpDefaultCache.remove(base_url + '/user');
		},

		usercommunity: $resource(
			base_url + '/usercommunity/:user/',
			{},
			{
				get: {
					method: 'GET',
					isArray: false,
					cache: false
				},
				list: {
					method: 'GET',
					isArray: true,
					cache: false,
					url: base_url + '/usercommunity/'
				}
			}
		),

		provider: $resource(
			base_url + '/provider/',
			{},
			{
				get: {
					method: 'GET',
					isArray: true,
					cache: false
				},
				post: {
					method: 'POST',
					isArray: false,
					url: base_url + '/new/provider/',
					cache: true
				}
			}
		),

		transactions: $resource(
			base_url + '/community/:community/transactions/',
			{},
			{
				get: {
					method: 'GET',
					isArray: false,
					cache: true
				}
			}
		),

		pendingpayments: $resource(
			base_url + '/pendingpayments/',
			{},
			{
				get: {
					method: 'GET',
					isArray: true,
					cache: true
				}
			}
		),

		receipts: $resource(
			base_url + '/community/:community/receipts',
			{},
			{
				get: {
					method: 'GET',
					isArray: true,
					cache: true
				}
			}
		),

		get_account_file: $resource(
			base_url + '/community/:community/accounting',
			{},
			{
				get: {
					method: 'GET',
					isArray: false,
					cache: true
				}
			}
		),

		upload_account_file: $resource(
			base_url + '/community/:community/accounting/upload',
			{},
			{
				get: {
					method: 'POST',
					isArray: false,
					cache: true
				}
			}
		),

		get_contract_file: $resource(
			base_url + '/community/:community/contracts',
			{},
			{
				get: {
					method: 'GET',
					isArray: false,
					cache: true
				}
			}
		),

		upload_contract_file: $resource(
			base_url + '/community/:community/contracts/upload',
			{},
			{
				get: {
					method: 'POST',
					isArray: false,
					cache: true
				}
			}
		),

		get_invoice_file: $resource(
			base_url + '/community/:community/invoices',
			{},
			{
				get: {
					method: 'GET',
					isArray: false,
					cache: true
				}
			}
		),

		upload_invoice_file: $resource(
			base_url + '/community/:community/invoices/upload',
			{},
			{
				get: {
					method: 'POST',
					isArray: false,
					cache: true
				}
			}
		),

		savings: $resource(
			base_url + '/savings/',
			{},
			{
				get: {
					method: 'GET',
					isArray: true,
					cache: true
				}
			}
		),

		repairs: $resource(
			base_url + '/repairs/:id/',
			{},
			{
				list: {
					method: 'GET',
					isArray: true,
					url: base_url + '/repairs/',
					cache: true
				},
				get: {
					method: 'GET',
					isArray: false,
					cache: true
				}
			}
		),

		repair_photos: $resource(
			base_url + '/repair_photos/',
			{},
			{
				get: {
					method: 'GET',
					isArray: true,
					cache: true
				}
			}
		),

		get_user_repair_budgets: $resource(
			base_url + '/community/:community_id/budgets/',
			{},
			{
				get: {
					method: 'GET',
					isArray: false,
					cache: false
				}
			}
		),

		repair_budgets: $resource(
			base_url + '/budget/list/:community_id',
			{},
			{
				get: {
					method: 'GET',
					isArray: false,
					cache: true
				}
			}
		),

		meetings: $resource(
			base_url + '/meeting/:id/',
			{},
			{
				list: {
					method: 'GET',
					isArray: true,
					url: base_url + '/community/:community/meetings/',
					cache: false
				},
				get: {
					method: 'GET',
					isArray: false,
					cache: false
				},
				post: {
					method: 'POST',
					isArray: false,
					cache: true,
					url: base_url + '/community/:community/new/meeting/'
				}
			}
		),

		meeting_summary_upload: $resource(
			base_url + '/meeting/:id/summary/upload/',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: true,
					url: base_url + '/community/:community/meeting/:id/summary/upload/'
				}
			}
		),

		meeting_points_upload: $resource(
			base_url + '/meeting/:id/summary/upload/',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: true,
					url: base_url + '/community/:community/meeting/:id/points/update/'
				}
			}
		),

		meeting_subjects: $resource(
			base_url + '/meeting_subject/:id/',
			{},
			{
				list: {
					method: 'GET',
					isArray: true,
					url: base_url + '/meeting/:id/subjects/',
					cache: false
				},
				get: {
					method: 'GET',
					isArray: false,
					cache: false
				},
				post: {
					method: 'POST',
					isArray: false,
					cache: true,
					url: base_url + '/community/:community/new/voting/'
				}
			}
		),

		activate_voting: $resource(
			base_url + '/community/voting/:id/enable',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: true,
					url: base_url + '/community/voting/:id/enable'
				}
			}
		),

		delete_voting: $resource(
			base_url + '/community/:community/delete/voting/:id_voting',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: true
				}
			}
		),

		meeting_options: $resource(
			base_url + '/meeting_option/:subject/',
			{},
			{
				list: {
					method: 'GET',
					isArray: true,
					url: base_url + '/meeting_subject/:subject/options/',
					cache: false
				},
				get: {
					method: 'GET',
					isArray: false,
					cache: false
				},
				vote: {
					method: 'POST',
					isArray: false,
					cache: true,
					url: base_url + '/vote'
				}
			}
		),

		meeting_option_arguments: $resource(
			base_url + '/meeting_option_argument/:id/',
			{},
			{
				list: {
					method: 'GET',
					isArray: true,
					url: base_url + '/meeting_option_argument/',
					cache: false
				},
				get: {
					method: 'GET',
					isArray: false,
					cache: false
				},
				post: {
					method: 'POST',
					isArray: false,
					cache: false,
					url: base_url + '/community/:community/new/voting/argument/'
				}
			}
		),

		meeting_option_votes: $resource(
			base_url + '/meeting_option_vote/:id/',
			{},
			{
				list: {
					method: 'GET',
					isArray: true,
					url: base_url + '/meeting_option_vote/',
					cache: true
				},
				get: {
					method: 'GET',
					isArray: false,
					cache: true
				}
			}
		),

		meeting_subjects_voting: $resource(
			base_url + '/community/:community/votings',
			{},
			{
				list: {
					method: 'GET',
					isArray: true,
					cache: false
				}
			}
		),

		vote_count: $resource(
			base_url + '/countVote/:id/',
			{},
			{
				get: {
					method: 'GET',
					isArray: false,
					cache: false
				}
			}
		),

		cur_user_vote: $resource(
			base_url + '/voted/:subject',
			{},
			{
				get: {
					method: 'GET',
					isArray: false,
					cache: false
				}
			}
		),

		home_page_summary: $resource(
			base_url + '/community/:id/summary',
			{},
			{
				get: {
					method: 'GET',
					isArray: false,
					cache: false
				}
			}
		),

		get_community_tickets: $resource(
			base_url + '/community/:community/tickets',
			{},
			{
				get: {
					method: 'GET',
					isArray: true,
					cache: false
				}
			}
		),

		get_community_ticket_detail: $resource(
			base_url + '/community/:community/ticket/:id',
			{},
			{
				get: {
					method: 'GET',
					isArray: false,
					cache: false
				}
			}
		),

		add_community_ticket: $resource(
			base_url + '/community/:community/new/ticket',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: true
				}
			}
		),

		delete_community_ticket: $resource(
			base_url + '/community/:community/delete/ticket/:id_ticket',
			{},
			{
				delete: {
					method: 'DELETE',
					isArray: false,
					cache: true
				}
			}
		),

		update_community_ticket_status: $resource(
			base_url + '/community/:community/update/ticket/:id_ticket/status',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: true
				}
			}
		),

		update_community_ticket_priority: $resource(
			base_url + '/community/:community/update/ticket/:id_ticket/priority',
			{},
			{
				post: {
					method: 'GET',
					isArray: true,
					cache: true
				}
			}
		),

		pick_community_ticket: $resource(
			base_url + '/community/:community/pick/ticket/:id_ticket',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: true
				}
			}
		),

		confirm_community_ticket: $resource(
			base_url + '/community/:community/confirm/ticket/:id_ticket',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: true
				}
			}
		),

		add_new_community: $resource(
			base_url + '/community/new',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: true
				}
			}
		),

		update_community_data: $resource(
			base_url + '/community/:id/update',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: true
				}
			}
		),

		save_token: $resource(
			base_url + '/save_token',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: true
				}
			}
		),

		get_token: $resource(
			base_url + '/get_token',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: true
				}
			}
		),

		direct_access: $resource(
			base_url + '/direct_access',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: true
				}
			}
		),

		properties: $resource(
			base_url + '/property/?number_id=:number_id',
			{},
			{
				get: {
					method: 'GET',
					isArray: true,
					cache: true
				}
			}
		),
		create_user: $resource(
			base_url + '/community/:community/new/user',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: false
				}
			}
		),
		provinces: $resource(
			base_url + '/province/',
			{},
			{
				get: {
					method: 'GET',
					isArray: true,
					cache: true
				}
			}
		),
		municipalities: $resource(
			base_url + '/municipality/?province_id=:province_id',
			{},
			{
				get: {
					method: 'GET',
					isArray: true,
					cache: true
				}
			}
		),
		streets: $resource(
			base_url + '/street/?municipality_id=:municipality_id',
			{},
			{
				get: {
					method: 'GET',
					isArray: true,
					cache: true
				}
			}
		),
		numbers: $resource(
			base_url + '/number/?street_id=:street_id',
			{},
			{
				get: {
					method: 'GET',
					isArray: true,
					cache: true
				}
			}
		),
		save_form: $resource(
			base_url + '/calculator/form/',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: true
				}
			}
		),
		remember_magic_link: $resource(
			base_url + '/remember_magic_link',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: false
				}
			}
		),
		get_categories: $resource(
			base_url + '/budget/es/categories',
			{},
			{
				get: {
					method: 'GET',
					isArray: false,
					cache: false
				}
			}
		),
		get_provider_rate: $resource(
			base_url + '/provider_rate/get',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: false
				}
			}
		),
		save_provider_rate: $resource(
			base_url + '/provider_rate/save',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: false
				}
			}
		),
		get_sentence: $resource(
			base_url + '/sentence/:id',
			{},
			{
				post: {
					method: 'GET',
					isArray: false,
					cache: true
				}
			}
		),
		get_scb_consumption: $resource(
			energy_base_url + '/consumed/?community=:community&usercommunity=:usercommunity',
			{},
			{
				get: {
					method: 'GET',
					isArray: true,
					cache: false
				}
			}
		),
		get_scb_invoices: $resource(
			energy_base_url + '/invoice/?usercommunity=:usercommunity',
			{},
			{
				get: {
					method: 'GET',
					isArray: true,
					cache: false
				}
			}
		),
		get_scb_transactions: $resource(
			energy_base_url + '/transaction/?community=:community',
			{},
			{
				get: {
					method: 'GET',
					isArray: true,
					cache: false
				}
			}
		),
		generate_invoice: $resource(
			energy_base_url + '/manual_invoice',
			{},
			{
				post: {
					method: 'GET',
					isArray: false,
					cache: false
				}
			}
		),
		frontpage_popup: $resource(
			base_url + '/home/popup/save',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: false
				}
			}
		),
		yaquevas_get_markers: $resource(
			base_url + '/yaquevas/marker/get',
			{},
			{
				post: {
					method: 'POST',
					isArray: true,
					cache: false
				}
			}
		),
		yaquevas_save_markers: $resource(
			base_url + '/yaquevas/marker/save',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: false
				}
			}
		),
		yaquevas_send_message: $resource(
			base_url + '/yaquevas/send_message',
			{},
			{
				post: {
					method: 'POST',
					isArray: false,
					cache: false
				}
			}
		),
		yaquevas_get_detail: $resource(
			base_url + '/yaquevas/marker/detail/:id',
			{},
			{
				get: {
					method: 'GET',
					isArray: false,
					cache: false
				}
			}
		)
	};
});
